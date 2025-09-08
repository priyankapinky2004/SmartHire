// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

// Types for Keycloak JWT token
interface KeycloakToken {
  exp: number;
  preferred_username: string;
  email: string;
  given_name?: string;
  family_name?: string;
  realm_access: {
    roles: string[];
  };
  resource_access: {
    [key: string]: {
      roles: string[];
    };
  };
  sub: string; // subject (user id)
}

// Middleware to verify and process JWT token
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // No authentication needed for public routes
      return next();
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    // In production, you should verify using Keycloak's public key
    const keycloakUrl =
      process.env.KEYCLOAK_URL || "http://localhost:8080/auth";
    const realm = process.env.KEYCLOAK_REALM || "ai-smart-hire";

    try {
      // Option 1: Verify locally using public key (more efficient)
      // This would require fetching and caching the public key from Keycloak

      // Option 2: Verify with Keycloak server (simpler but less efficient)
      const response = await axios.get(
        `${keycloakUrl}/realms/${realm}/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If we get here, token is valid
      const userInfo = response.data;

      // Decode the token to get additional info
      const decodedToken = jwt.decode(token) as KeycloakToken;

      // Set user info in the request object
      req.user = {
        id: decodedToken.sub,
        email: decodedToken.email,
        username: decodedToken.preferred_username,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        roles: decodedToken.realm_access.roles,
      };

      next();
    } catch (error) {
      // Token verification failed
      console.error("Token verification failed:", error);
      req.user = null;
      next();
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    req.user = null;
    next();
  }
};
