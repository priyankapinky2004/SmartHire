// src/models/Resume.ts
import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  description: { type: String },
});

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startDate: { type: String },
  endDate: { type: String },
});

const ContactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
});

const ResumeDataSchema = new mongoose.Schema({
  skills: [{ type: String }],
  experience: [ExperienceSchema],
  education: [EducationSchema],
  contact: ContactInfoSchema,
});

const ResumeSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  originalFilename: { type: String, required: true },
  parsedData: { type: ResumeDataSchema },
  uploadedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },
});

export const Resume = mongoose.model("Resume", ResumeSchema);
