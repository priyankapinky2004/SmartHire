// src/resolvers/queries/assessmentQueries.ts
import { Assessment } from "../../models/Assessment";
import { EmotionAnalysisService } from "../../services/emotion/emotionAnalysis";

const emotionAnalysisService = new EmotionAnalysisService();

export const assessmentQueries = {
  getAssessment: async (_: any, { id }: { id: string }, context: any) => {
    try {
      const assessment = await Assessment.findById(id);

      if (!assessment) {
        throw new Error("Assessment not found");
      }

      // Get emotion data if available
      const emotionData = await emotionAnalysisService.getAssessmentEmotionData(
        id
      );

      return {
        ...assessment.toObject(),
        emotionData: emotionData.dataPoints,
      };
    } catch (error) {
      console.error("Error fetching assessment:", error);
      throw new Error("Failed to fetch assessment");
    }
  },

  getCandidateAssessments: async (
    _: any,
    { candidateId }: { candidateId: string },
    context: any
  ) => {
    try {
      const assessments = await Assessment.find({ candidateId }).sort(
        "-createdAt"
      );
      return assessments;
    } catch (error) {
      console.error("Error fetching candidate assessments:", error);
      throw new Error("Failed to fetch candidate assessments");
    }
  },
};
