import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  resource_type?: string;
  width?: number;
  height?: number;
  crop?: string;
  quality?: string;
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  filename: string,
  options: UploadOptions = {},
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        filename_override: filename,
        folder: options.folder || "creative-canvas-hub",
        ...options,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}

export function getCloudinaryUrl(publicId: string, options: Record<string, any> = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
}

// Extract Google Drive file ID from share link
export function extractGoogleDriveFileId(url: string): string | null {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

// Convert Google Drive share link to direct image URL
export function getGoogleDriveImageUrl(fileId: string): string {
  return `https://drive.google.com/uc?id=${fileId}&export=view`;
}
