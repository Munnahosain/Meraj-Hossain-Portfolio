import { randomUUID } from "node:crypto";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const imageTypes = {
  "image/avif": {
    extension: "avif",
    signature: (bytes: Buffer) =>
      bytes.toString("ascii", 4, 12).startsWith("ftypavif") ||
      bytes.toString("ascii", 4, 12).startsWith("ftypavis"),
  },
  "image/gif": {
    extension: "gif",
    signature: (bytes: Buffer) => ["GIF87a", "GIF89a"].includes(bytes.toString("ascii", 0, 6)),
  },
  "image/jpeg": {
    extension: "jpg",
    signature: (bytes: Buffer) =>
      bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  "image/png": {
    extension: "png",
    signature: (bytes: Buffer) => bytes.toString("hex", 0, 8) === "89504e470d0a1a0a",
  },
  "image/webp": {
    extension: "webp",
    signature: (bytes: Buffer) =>
      bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP",
  },
} as const;

export type SupportedImageMimeType = keyof typeof imageTypes;

export class R2StorageError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "R2StorageError";
    this.status = status;
  }
}

let client: S3Client | undefined;

function getR2Config() {
  const required = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
    "R2_PUBLIC_BASE_URL",
  ] as const;
  const missing = required.filter((key) => !process.env[key]);
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;

  if (missing.length > 0) {
    throw new R2StorageError(`Cloudflare R2 is not configured. Set: ${missing.join(", ")}.`, 503);
  }

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicBaseUrl) {
    throw new R2StorageError("Cloudflare R2 configuration is incomplete.", 503);
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicBaseUrl: publicBaseUrl.replace(/\/+$/, ""),
  };
}

function getR2Client(config: ReturnType<typeof getR2Config>) {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return client;
}

export function getImageUploadLimit() {
  const configuredLimit = process.env.R2_MAX_UPLOAD_BYTES;
  if (!configuredLimit) return 10 * 1024 * 1024;

  const limit = Number(configuredLimit);
  if (!Number.isSafeInteger(limit) || limit <= 0) {
    throw new R2StorageError("R2_MAX_UPLOAD_BYTES must be a positive integer.", 500);
  }
  return limit;
}

export function validateImageUpload(mimeType: string, fileBuffer: Buffer) {
  if (!Object.hasOwn(imageTypes, mimeType)) {
    throw new R2StorageError("Unsupported image format. Use JPEG, PNG, WebP, GIF, or AVIF.", 400);
  }

  const imageType = imageTypes[mimeType as SupportedImageMimeType];
  if (!imageType.signature(fileBuffer)) {
    throw new R2StorageError("The uploaded file does not match its image type.", 400);
  }

  return {
    mimeType: mimeType as SupportedImageMimeType,
    extension: imageType.extension,
  };
}

export async function uploadImageToR2(
  fileBuffer: Buffer,
  mimeType: SupportedImageMimeType,
  extension: string,
) {
  const config = getR2Config();
  const key = `images/${randomUUID()}.${extension}`;

  let baseUrl: URL;
  try {
    baseUrl = new URL(config.publicBaseUrl);
  } catch {
    throw new R2StorageError("R2_PUBLIC_BASE_URL must be a valid public HTTPS URL.", 500);
  }
  if (
    baseUrl.protocol !== "https:" ||
    baseUrl.username ||
    baseUrl.password ||
    baseUrl.search ||
    baseUrl.hash
  ) {
    throw new R2StorageError("R2_PUBLIC_BASE_URL must use HTTPS.", 500);
  }

  const r2 = getR2Client(config);
  try {
    await r2.send(
      new PutObjectCommand({
        Bucket: config.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (error) {
    console.error("Cloudflare R2 upload failed:", error);
    throw new R2StorageError(
      "Cloudflare R2 upload failed. Verify the bucket token, bucket name, and network connectivity.",
      502,
    );
  }

  return {
    key,
    url: `${config.publicBaseUrl}/${key.split("/").map(encodeURIComponent).join("/")}`,
  };
}
