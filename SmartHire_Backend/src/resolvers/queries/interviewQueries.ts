// src/resolvers/queries/interviewQueries.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const interviewQueries = {
  getInterview: async (_: any, { id }: { id: string }, context: any) => {
    try {
      const interview = await prisma.interview.findUnique({
        where: { id },
      });

      if (!interview) {
        throw new Error("Interview not found");
      }

      return interview;
    } catch (error) {
      console.error("Error fetching interview:", error);
      throw new Error("Failed to fetch interview");
    }
  },

  getCandidateInterviews: async (
    _: any,
    { candidateId }: { candidateId: string },
    context: any
  ) => {
    try {
      const interviews = await prisma.interview.findMany({
        where: { candidateId },
        orderBy: { scheduledTime: "desc" },
      });

      return interviews;
    } catch (error) {
      console.error("Error fetching candidate interviews:", error);
      throw new Error("Failed to fetch candidate interviews");
    }
  },

  getRecruiterInterviews: async (
    _: any,
    { recruiterId }: { recruiterId: string },
    context: any
  ) => {
    try {
      const interviews = await prisma.interview.findMany({
        where: { recruiterId },
        orderBy: { scheduledTime: "desc" },
      });

      return interviews;
    } catch (error) {
      console.error("Error fetching recruiter interviews:", error);
      throw new Error("Failed to fetch recruiter interviews");
    }
  },
};
