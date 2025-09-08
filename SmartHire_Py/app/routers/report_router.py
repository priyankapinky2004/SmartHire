from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.report_generator import generate_final_report

router = APIRouter()


class FinalReportInput(BaseModel):
    candidate_id: str
    resume_text: str
    interview_transcript: str
    emotion_labels: list[str]  # e.g., ["happy", "neutral", "happy", "sad", "neutral"]


@router.post("/generate")
async def generate_report(input: FinalReportInput):
    try:
        report = await generate_final_report(input)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/candidates")
async def get_candidate_report_summaries():
    # TODO: Replace with actual DB query
    return [
        {"id": "abc123", "name": "Alice Johnson", "score": 88},
        {"id": "xyz789", "name": "Bob Smith", "score": 75},
    ]
