// src/services/llm/openaiService.ts
import OpenAI from 'openai';

export class OpenAIService {
  private openai: OpenAI;
  
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  
  /**
   * Analyze interview transcript using OpenAI
   */
  async analyzeInterview(transcript: string, questions: string[]) {
    try {
      // Create a structured prompt for the LLM
      const prompt = `
        You are an AI interviewer evaluating a job candidate. Below is the transcript of an interview.
        Please analyze the candidate's responses to the following questions and rate each answer on a scale of 1-100.
        Also provide a brief feedback for each answer.
        
        Interview Transcript:
        ${transcript}
        
        Questions to evaluate:
        ${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        
        For each question, provide:
        1. Score (1-100)
        2. Brief feedback (1-2 sentences)
        3. Key strengths and weaknesses
        
        Finally, give an overall evaluation score from 1-5 where:
        1 - Not selected
        2-3 - On hold
        4 - Selected but requires additional interview
        5 - Selected
        
        Provide your response in the following JSON format:
        {
          "questionScores": [
            {
              "questionId": "1",
              "score": 75,
              "feedback": "Good understanding of concepts but lacked specific examples."
            },
            ...
          ],
          "overallScore": 3,
          "overallFeedback": "Candidate shows promise but needs more technical depth."
        }
      `;
      
      // Call the OpenAI API
      const response = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert hiring manager evaluating interview responses." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2, // Lower temperature for more consistent scoring
      });
      
      // Parse the response
      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }
      
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse JSON from OpenAI response');
      }
      
      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to analyze interview with LLM');
    }
  }
}