import express from "express";
import { ApolloServer } from "apollo-server-express";
import { readFileSync } from "fs";
import { resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "./resolvers";
import { authMiddleware } from "./middleware/auth";
import { graphqlUploadExpress } from 'graphql-upload-minimal';


// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Initialize Prisma
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(express.json());
app.use(authMiddleware);
app.use(graphqlUploadExpress());

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/ai-smart-hire"
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Read GraphQL schema
const typeDefs = readFileSync(
  resolve(__dirname, "./schemas/schema.graphql"),
  "utf8"
);

// Create schema with resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({
      req,
      prisma,
      user: req.user, // Will be populated by auth middleware
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  // Connect to database before starting server
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(`🔐 Environment: ${process.env.NODE_ENV || "development"}`);
  });
};

// API health check route
app.get("/health", (_, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start the server
startApolloServer().catch((err) => {
  console.error("Failed to start server:", err);
});

// Handle unexpected errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

export default app;
