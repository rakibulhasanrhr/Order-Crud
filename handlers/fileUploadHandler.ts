import multer, { type FileFilterCallback } from "multer";
import { type Request } from "express";

// Define file types for multer
interface MulterFile {
  originalname: string;
  mimetype: string;
}

const tempStorage = multer.memoryStorage();

// Image filter for multer
function imageFilter(
  req: Request,
  file: MulterFile,
  cb: FileFilterCallback
): void {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// File filter for multer
function fileFilter(
  req: Request,
  file: MulterFile,
  cb: FileFilterCallback
): void {
  const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

// Multer configurations for single file upload
const uploadSingleFile = multer({
  storage: tempStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2 MB
    files: 1,
  },
});

// Multer configurations for multiple file upload
const uploadMultipleFile = multer({
  storage: tempStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2 MB
    files: 10,
  },
});

// Multer configuration for single image upload to S3 bucket
const uploadSingleImage = multer({
  storage: tempStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2 MB
    files: 1,
  },
});

// Multer configuration for multiple image upload to S3 bucket
const uploadMultipleImage = multer({
  storage: tempStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2 MB
    files: 10,
  },
});

const uploadImages = multer({
  storage: tempStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2 * 1000 * 1000, // 2 MB
  },
}).fields([
  { name: "newImage", maxCount: 1 },
  { name: "oldImage", maxCount: 1 },
]);

// Multer middleware configurations (For single and multiple file uploads)
const uploadSingleFileBucket = uploadSingleFile.single("file");
const uploadMultipleFilesBucket = uploadMultipleFile.array("files");

// Multer middleware configurations (For single and multiple image uploads)
const uploadSingleImageBucket = uploadSingleImage.single("image");
const uploadMultipleImageBucket = uploadMultipleImage.array("images");

// Multer middleware configurations (For New and Old image uploads)
const uploadNewImage = uploadSingleImage.single("newImage");
const uploadOldImage = uploadSingleImage.single("oldImage");

export {
  uploadSingleImageBucket,
  uploadMultipleImageBucket,
  uploadSingleFileBucket,
  uploadMultipleFilesBucket,
  uploadOldImage,
  uploadNewImage,
  uploadImages,
};
