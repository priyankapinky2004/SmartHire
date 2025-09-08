// src/services/emotion/emotionAnalysis.ts
import { EmotionDataPoint } from "../../models/EmotionData";
import { TensorflowService } from "./tensorflowService";

export class EmotionAnalysisService {
  private tensorflowService = new TensorflowService();
  /**
   * Process a screenshot and detect emotions
   */
  async analyzeEmotion(
    assessmentId: string,
    imageBuffer: Buffer
  ): Promise<any> {
    try {
      // Use TensorFlow service to process the screenshot
      const emotionDataPoint = await this.tensorflowService.processScreenshot(
        assessmentId,
        imageBuffer
      );

      return emotionDataPoint;
    } catch (error) {
      console.error("Error analyzing emotion:", error);
      throw new Error("Failed to analyze emotion");
    }
  }

  /**
   * Get aggregated emotion data for an assessment
   */
  async getAssessmentEmotionData(assessmentId: string): Promise<any> {
    try {
      const emotionData = await EmotionDataPoint.find({ assessmentId }).sort(
        "timestamp"
      );

      // Calculate emotion statistics
      const emotionCounts = emotionData.reduce((acc: any, dataPoint) => {
        acc[dataPoint.emotion] = (acc[dataPoint.emotion] || 0) + 1;
        return acc;
      }, {});

      const totalPoints = emotionData.length;

      const emotionStats = Object.entries(emotionCounts).map(
        ([emotion, count]) => ({
          emotion,
          percentage:
            totalPoints > 0 ? ((count as number) / totalPoints) * 100 : 0,
        })
      );

      return {
        dataPoints: emotionData,
        stats: emotionStats,
      };
    } catch (error) {
      console.error("Error fetching emotion data:", error);
      throw new Error("Failed to fetch emotion data");
    }
  }
}
