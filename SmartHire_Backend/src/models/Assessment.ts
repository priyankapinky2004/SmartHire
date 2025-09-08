// src/models/Assessment.ts
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "CODING"],
    required: true,
  },
  content: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String },
});

const AssessmentSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  timeAllowed: { type: Number },
});

const AssessmentSchema = new mongoose.Schema({
  candidateId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  sections: [AssessmentSectionSchema],
  status: {
    type: String,
    enum: ["CREATED", "SENT", "IN_PROGRESS", "COMPLETED", "EXPIRED"],
    default: "CREATED",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Assessment = mongoose.model("Assessment", AssessmentSchema);
