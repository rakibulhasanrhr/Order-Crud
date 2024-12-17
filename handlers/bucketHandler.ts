import dotenv from "dotenv";

dotenv.config();
import {S3Client, PutObjectCommand, DeleteObjectsCommand} from "@aws-sdk/client-s3";
import {type Request} from "express";

// Initialize the S3 Client
const space = new S3Client({
  endpoint: process.env.ENDPOINT || "", // Check if the endpoint is set
  credentials: {
    accessKeyId: process.env.SPACES_KEY || "", // Ensure key is provided
    secretAccessKey: process.env.SPACES_SECRET || "", // Ensure secret is provided
  },
  region: process.env.REGION || "", // Check if the region is set
});

// Function to upload to S3 bucket
const uploadToBucket = async (
    req: Request, // Type of the req parameter is Request from express
    folderName: string | null,
    fileName: string
): Promise<void> => {
  // Ensure req.file exists and has the required properties
  if (!req.file || !req.file.buffer || !req.file.mimetype) {
    throw new Error("File is missing or incomplete.");
  }

  try {
    const uploadStatus = await space.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME, // The bucket name
          Key: `${fileName}`, // If folderName is undefined, use 'defaultFolder'
          Body: req.file.buffer, // The file content
          ContentType: req.file.mimetype, // The file MIME type
          ACL: "public-read", // Set access permissions
        })
    );

    // Check if the upload was successful
    if (
        uploadStatus.$metadata.httpStatusCode !== 200 ||
        !uploadStatus.$metadata.httpStatusCode
    ) {
      throw new Error("Upload failed, try again later.");
    }
  } catch (error) {
    // Handle errors during upload
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload the file.");
  }
};

// TODO: Will review and do after finishing the project
// Function to delete from S3 bucket
const deleteFromBucket = async (
    req: Request, // Type of the req parameter is Request from express
    folderName: string | null,
    fileName: string
): Promise<void> => {
  try {
    const deleteStatus = await space.send(
        new DeleteObjectsCommand({
          Bucket: process.env.BUCKET_NAME, // The bucket name
          Delete: {
            Objects: [
              {
                Key: fileName, // The file name to delete
              },
            ],
            Quiet: false,
          },
        })
    );

    // Check if delete was successful
    if (
        deleteStatus.$metadata.httpStatusCode !== 200 ||
        !deleteStatus.$metadata.httpStatusCode
    ) {
      throw new Error("Delete failed, try again later.");
    }
  } catch (error) {
    // Handle errors during delete
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete the file.");
  }
};

export {uploadToBucket, deleteFromBucket};
