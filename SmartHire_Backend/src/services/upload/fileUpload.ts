// src/services/upload/fileUpload.ts
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { GraphQLUpload } from "graphql-upload-minimal";

// In a production app, you would use cloud storage like S3
// This is a simple file system implementation for development
export class FileUploadService {
  private uploadDir: string;

  constructor() {
    // Create upload directory if it doesn't exist
    this.uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async saveFile(file: any): Promise<{ filename: string; filepath: string }> {
    const { createReadStream, filename, mimetype } = await file;
    const stream = createReadStream();

    // Generate unique filename
    const uniqueFilename = `${uuidv4()}-${filename}`;
    const filepath = path.join(this.uploadDir, uniqueFilename);

    // Save the file
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(filepath);

      stream.pipe(writeStream);

      writeStream.on("finish", () => {
        resolve({
          filename: uniqueFilename,
          filepath,
        });
      });

      writeStream.on("error", (error) => {
        reject(error);
      });
    });
  }

  getFilePath(filename: string): string {
    return path.join(this.uploadDir, filename);
  }

  async getFileBuffer(filename: string): Promise<Buffer> {
    const filepath = this.getFilePath(filename);
    return fs.promises.readFile(filepath);
  }
}

// Export the Upload scalar for GraphQL
export const Upload = GraphQLUpload;
