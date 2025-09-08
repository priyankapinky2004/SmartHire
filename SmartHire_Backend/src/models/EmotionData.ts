// src/models/EmotionData.ts
import mongoose from "mongoose";

const EmotionDataPointSchema = new mongoose.Schema({
  assessmentId: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true },
  emotion: {
    type: String,
    enum: ["HAPPY", "NEUTRAL", "SAD", "DISTRESS", "ANGER"],
    required: true,
  },
  confidence: { type: Number, required: true },
  screenshotId: { type: String },
});

export const EmotionDataPoint = mongoose.model(
  "EmotionDataPoint",
  EmotionDataPointSchema
);
