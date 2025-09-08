// src/services/assessment/assessmentGenerator.ts
import { Assessment } from "../../models/Assessment";

interface AssessmentQuestion {
  type: "MULTIPLE_CHOICE" | "CODING";
  content: string;
  options?: string[];
  correctAnswer?: string;
}

interface AssessmentSection {
  title: string;
  questions: AssessmentQuestion[];
  timeAllowed?: number;
}

export class AssessmentGeneratorService {
  /**
   * Generate an assessment based on extracted skills
   */
  async generateAssessment(
    candidateId: string,
    skills: string[]
  ): Promise<Assessment> {
    try {
      // In a real implementation, you would:
      // 1. Query a question bank based on skills
      // 2. Use an LLM to generate relevant questions

      // This is a placeholder with mock questions
      const sections: AssessmentSection[] = [];

      // Generate sections for each skill
      for (const skill of skills) {
        const questions: AssessmentQuestion[] = [];

        // Generate 5 multiple choice questions per skill
        for (let i = 1; i <= 5; i++) {
          questions.push({
            type: "MULTIPLE_CHOICE",
            content: `Sample ${skill} question ${i}?`,
            options: [
              `Option A for ${skill} question ${i}`,
              `Option B for ${skill} question ${i}`,
              `Option C for ${skill} question ${i}`,
              `Option D for ${skill} question ${i}`,
            ],
            correctAnswer: `Option A for ${skill} question ${i}`,
          });
        }

        // Add a coding question for coding-related skills
        if (
          ["JavaScript", "Python", "Java", "React", "Node.js"].includes(skill)
        ) {
          questions.push({
            type: "CODING",
            content: `Write a function in ${skill} that performs a simple task.`,
          });
        }

        sections.push({
          title: `${skill} Assessment`,
          questions,
          timeAllowed: 1800, // 30 minutes in seconds
        });
      }

      // Create assessment
      const assessment = new Assessment({
        candidateId,
        title: "Skill Assessment",
        sections,
        status: "CREATED",
      });

      await assessment.save();

      return assessment;
    } catch (error) {
      console.error("Error generating assessment:", error);
      throw new Error("Failed to generate assessment");
    }
  }
}
