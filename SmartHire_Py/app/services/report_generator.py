from collections import Counter
from app.services.interview_analysis.scorer import score_transcript
# from app.services.resume_parser.parser import parse_resume  ← Add when ready

# Dummy parser for now
def parse_resume(resume_text: str):
    return {
        "name": "Candidate Name",
        "experience": "3+ years",
        "skills": ["Python", "Node.js", "AWS"]
    }

async def generate_final_report(input):
    resume_data = parse_resume(input.resume_text)

    emotion_counts = dict(Counter(input.emotion_labels))

    interview_result = await score_transcript(input.interview_transcript)

    return {
        "candidate_id": input.candidate_id,
        "resume_summary": resume_data,
        "emotion_summary": emotion_counts,
        "interview_score": interview_result["score"],
        "interview_feedback": interview_result["feedback"]
    }
