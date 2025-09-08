// src/resolvers/queries/resumeQueries.ts
import { Resume } from "../../models/Resume";

export const resumeQueries = {
  getResume: async (_: any, { id }: { id: string }) => {
    try {
      const resume = await Resume.findById(id);
      return resume;
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw new Error("Failed to fetch resume");
    }
  },
};
