from fastapi import FastAPI
from app.routers import emotion_router, interview_router
from app.routers import report_router


app = FastAPI()

app.include_router(report_router.router, prefix="/report", tags=["Final Report"])
app.include_router(emotion_router.router, prefix="/emotion", tags=["Emotion Analysis"])
app.include_router(
    interview_router.router, prefix="/interview", tags=["Interview Scoring"]
)


@app.get("/")
def root():
    return {"message": "AI Hire Platform API is up"}
