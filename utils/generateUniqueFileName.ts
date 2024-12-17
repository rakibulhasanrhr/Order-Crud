import path from 'path';
import crypto from 'crypto';

export const generateUniqueFileName = (originalName: string): string => {
  // Get the file extension
  const ext = path.extname(originalName);
  // Get the file name without extension
  const nameWithoutExt = path.basename(originalName, ext);
  // Generate timestamp
  const timestamp = Date.now();
  // Generate random string
  const randomString = crypto.randomBytes(8).toString('hex');
  // Combine everything to create unique filename
  return `${nameWithoutExt}-${timestamp}-${randomString}${ext}`;
};