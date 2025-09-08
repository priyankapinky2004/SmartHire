import os
import openai  # or any other LLM SDK

openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
You are an AI Interview Evaluator for a Software Developer role.

Your task is to review the candidate's interview transcript and:
1. Give a score between 0 and 100 based on the overall quality of responses.
2. Provide clear, professional feedback highlighting strengths and areas for improvement.

Evaluate based on these criteria:
- Technical knowledge (e.g., algorithms, data structures, system design)
- Problem-solving approach and logical thinking
- Code quality and understanding of best practices
- Communication clarity and confidence
- Relevance and conciseness of answers

If any area was not covered, mention that in the feedback.

Respond in this exact JSON format:

{
  "score": number,
  "feedback": string
}
"""


async def score_transcript(transcript: str):
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": transcript},
    ]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=messages, temperature=0.3
    )

    result_text = response["choices"][0]["message"]["content"]

    # Safe parsing of response into dict
    import json

    try:
        result = json.loads(result_text)
        return {"score": result["score"], "feedback": result["feedback"]}
    except json.JSONDecodeError:
        return {
            "score": None,
            "feedback": "AI failed to return a valid response. Please try again.",
        }
