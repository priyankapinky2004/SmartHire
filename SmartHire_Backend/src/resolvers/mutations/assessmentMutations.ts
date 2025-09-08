// src/resolvers/mutations/assessmentMutations.ts
import { Assessment } from "../../models/Assessment";
import { Resume } from "../../models/Resume";
import { AssessmentGeneratorService } from "../../services/assessment/assessmentGenerator";

const assessmentGeneratorService = new AssessmentGeneratorService();

export const assessmentMutations = {
  generateAssessmentFromResume: async (
    _: any,
    { resumeId }: { resumeId: string },
    context: any
  ) => {
    try {
      // Check authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      // Get the resume
      const resume = await Resume.findById(resumeId);

      if (!resume) {
        throw new Error("Resume not found");
      }

      // Check if resume has been processed
      if (resume.status !== "COMPLETED") {
        throw new Error("Resume has not been fully processed yet");
      }

      // Generate assessment based on skills
      const skills = resume.parsedData?.skills || [];
      const assessment = await assessmentGeneratorService.generateAssessment(
        resume.userId,
        skills
      );

      return assessment;
    } catch (error) {
      console.error("Error generating assessment from resume:", error);
      throw new Error("Failed to generate assessment");
    }
  },

  // Add other assessment mutations here
};
