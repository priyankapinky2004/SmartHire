from fastapi import APIRouter, File, UploadFile
from app.services.emotion_analysis.analyzer import analyze_emotion

router = APIRouter()

@router.post("/analyze")
async def analyze_emotion_endpoint(file: UploadFile = File(...)):
    result = await analyze_emotion(file)
    return {"emotion": result}
