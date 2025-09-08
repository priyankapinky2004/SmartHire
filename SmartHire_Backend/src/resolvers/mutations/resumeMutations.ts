// src/resolvers/mutations/resumeMutations.ts
import { Resume } from "../../models/Resume";
import { FileUploadService } from "../../services/upload/fileUpload";
import { ResumeParserService } from "../../services/resume/resumeParser";

const fileUploadService = new FileUploadService();
const resumeParserService = new ResumeParserService();

export const resumeMutations = {
  uploadResume: async (_: any, { file }: { file: any }, context: any) => {
    try {
      // Check authentication
      if (!context.user) {
        throw new Error("Authentication required");
      }

      // Save the uploaded file
      const { filename, filepath } = await fileUploadService.saveFile(file);

      // Create a new resume record
      const newResume = new Resume({
        userId: context.user.id,
        originalFilename: filename,
        status: "PENDING",
      });

      await newResume.save();

      // Queue resume parsing (in a production app, you'd use a job queue)
      // For simplicity, we'll process it directly
      const fileBuffer = await fileUploadService.getFileBuffer(filename);
      resumeParserService
        .parseResume(newResume.id, fileBuffer)
        .catch((error) => console.error("Resume parsing error:", error));

      return newResume;
    } catch (error) {
      console.error("Error uploading resume:", error);
      throw new Error("Failed to upload resume");
    }
  },
};
