from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.interview_analysis.scorer import score_transcript

router = APIRouter()

class TranscriptInput(BaseModel):
    transcript: str

@router.post("/score")
async def score_interview(input: TranscriptInput):
    try:
        result = await score_transcript(input.transcript)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
