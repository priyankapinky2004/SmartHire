// src/services/interview/interviewService.ts
import { PrismaClient } from "@prisma/client";
import { ZoomService } from "./zoomService";
import { OpenAIService } from "../llm/openaiService";

const prisma = new PrismaClient();
const zoomService = new ZoomService();
const openaiService = new OpenAIService();

export class InterviewService {
  /**
   * Schedule an interview with a candidate
   */
  async scheduleInterview(options: {
    candidateId: string;
    recruiterId: string;
    scheduledTime: string; // ISO format
    duration?: number; // minutes
  }) {
    try {
      // Create Zoom meeting
      const meeting = await zoomService.createMeeting({
        topic: "Interview with Candidate",
        startTime: options.scheduledTime,
        duration: options.duration || 60, // Default to 1 hour
        agenda: "AI Smart Hire Interview Session",
      });

      // Create interview record in database
      const interview = await prisma.interview.create({
        data: {
          candidateId: options.candidateId,
          recruiterId: options.recruiterId,
          scheduledTime: new Date(options.scheduledTime),
          status: "SCHEDULED",
          zoomMeetingId: String(meeting.id),
        },
      });

      return interview;
    } catch (error) {
      console.error("Error scheduling interview:", error);
      throw new Error("Failed to schedule interview");
    }
  }

  /**
   * Process a completed interview
   */
  async processCompletedInterview(interviewId: string) {
    try {
      // Get interview details
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
      });

      if (!interview || !interview.zoomMeetingId) {
        throw new Error("Interview not found or missing Zoom meeting ID");
      }

      // Get recording information
      const recordingData = await zoomService.getRecording(
        interview.zoomMeetingId
      );

      if (
        recordingData &&
        recordingData.recording_files &&
        recordingData.recording_files.length > 0
      ) {
        // Find the audio-only recording (for transcript)
        const audioRecording = recordingData.recording_files.find(
          (file: any) => file.file_type === "M4A" || file.file_type === "MP4"
        );

        if (audioRecording) {
          // Update interview with recording ID
          await prisma.interview.update({
            where: { id: interviewId },
            data: {
              zoomRecordingId: audioRecording.id,
              status: "COMPLETED",
            },
          });

          // In a production app, you would queue transcript processing
          this.processTranscript(interviewId, audioRecording.id).catch(
            (error) => console.error("Transcript processing error:", error)
          );
        }
      }

      return await prisma.interview.findUnique({
        where: { id: interviewId },
      });
    } catch (error) {
      console.error("Error processing completed interview:", error);
      throw new Error("Failed to process completed interview");
    }
  }

  /**
   * Process interview transcript
   */
  private async processTranscript(interviewId: string, recordingId: string) {
    try {
      // Get transcript from Zoom
      const transcript = await zoomService.getTranscript(recordingId);

      // Update interview with transcript
      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          transcript: transcript.transcript_text,
        },
      });

      // After getting the transcript, send it for LLM analysis
      // We'll implement this in the next section
    } catch (error) {
      console.error("Error processing transcript:", error);
      throw new Error("Failed to process transcript");
    }
  }

  async analyzeInterview(interviewId: string, questions: string[]) {
    try {
      // Get interview with transcript
      const interview = await prisma.interview.findUnique({
        where: { id: interviewId },
      });

      if (!interview || !interview.transcript) {
        throw new Error("Interview not found or missing transcript");
      }

      // Call OpenAI to analyze the transcript
      const analysis = await this.openaiService.analyzeInterview(
        interview.transcript,
        questions
      );

      // Format question scores for database
      const questionScores = analysis.questionScores.map((score: any) => ({
        questionId: score.questionId,
        question: questions[parseInt(score.questionId) - 1],
        score: score.score,
        feedback: score.feedback,
      }));

      // Map overall score to the enum values
      const decisionMap: { [key: number]: string } = {
        1: "NOT_SELECTED",
        2: "ON_HOLD",
        3: "ON_HOLD",
        4: "ADDITIONAL_INTERVIEW_REQUIRED",
        5: "SELECTED",
      };

      // Update interview with analysis results
      await prisma.interview.update({
        where: { id: interviewId },
        data: {
          aiScores: questionScores,
          overallScore: analysis.overallScore,
          decision: decisionMap[analysis.overallScore],
        },
      });

      return {
        questionScores,
        overallScore: analysis.overallScore,
        overallFeedback: analysis.overallFeedback,
        decision: decisionMap[analysis.overallScore],
      };
    } catch (error) {
      console.error("Error analyzing interview:", error);
      throw new Error("Failed to analyze interview");
    }
  }
}
