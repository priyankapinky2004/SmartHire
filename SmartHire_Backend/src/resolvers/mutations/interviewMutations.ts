// src/resolvers/mutations/interviewMutations.ts
import { InterviewService } from "../../services/interview/interviewService";

const interviewService = new InterviewService();

export const interviewMutations = {
  scheduleInterview: async (
    _: any,
    {
      candidateId,
      recruiterId,
      scheduledTime,
    }: { candidateId: string; recruiterId: string; scheduledTime: string },
    context: any
  ) => {
    try {
      // Check authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      // Schedule the interview
      const interview = await interviewService.scheduleInterview({
        candidateId,
        recruiterId,
        scheduledTime,
      });

      return interview;
    } catch (error) {
      console.error("Error scheduling interview:", error);
      throw new Error("Failed to schedule interview");
    }
  },

  completeInterview: async (
    _: any,
    {
      interviewId,
      questions,
    }: {
      interviewId: string;
      questions: string[];
    },
    context: any
  ) => {
    try {
      // Check authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      // Process the completed interview and get recording
      await interviewService.processCompletedInterview(interviewId);

      // Analyze the interview transcript
      const analysis = await interviewService.analyzeInterview(
        interviewId,
        questions
      );

      return analysis;
    } catch (error) {
      console.error("Error completing interview:", error);
      throw new Error("Failed to complete interview");
    }
  },
};
