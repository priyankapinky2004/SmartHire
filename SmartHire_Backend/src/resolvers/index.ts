// src/resolvers/index.ts
import { queries } from "./queries";
import { mutations } from "./mutations";
import { Upload } from "../services/upload/fileUpload";

export const resolvers = {
  Upload, // Add this
  Query: queries,
  Mutation: mutations,
};
