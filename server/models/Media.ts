import mongoose, { Schema } from "mongoose";

export interface IMedia {
  _id?: string;
  name?: string;
  fileName?: string;
  filename?: string;
  originalName?: string;
  url: string;
  publicId?: string;
  type?: "image" | "video" | "pdf" | "document" | "youtube" | "gdrive";
  fileType?: "image" | "video" | "pdf" | "document" | "youtube" | "gdrive";
  size: number;
  mimeType: string;
  folder: "logo" | "hero" | "portfolio" | "gallery" | "icon" | "resume" | "other";
  tags?: string[];
  altText?: string;
  uploadedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const mediaSchema = new Schema<IMedia>(
  {
    name: { type: String, default: "" },
    fileName: { type: String, default: "" },
    filename: { type: String, default: "" },
    originalName: { type: String, default: "" },
    url: { type: String, required: true },
    publicId: String,
    type: {
      type: String,
      enum: ["image", "video", "pdf", "document", "youtube", "gdrive"],
      default: "image",
    },
    fileType: {
      type: String,
      enum: ["image", "video", "pdf", "document", "youtube", "gdrive"],
      default: "image",
    },
    size: { type: Number, required: true, default: 0 },
    mimeType: { type: String, required: true, default: "application/octet-stream" },
    folder: {
      type: String,
      enum: ["logo", "hero", "portfolio", "gallery", "icon", "resume", "other"],
      default: "other",
    },
    tags: [String],
    altText: String,
    uploadedBy: String,
  },
  { timestamps: true },
);

mediaSchema.index({ fileName: "text", name: "text", tags: "text" });
mediaSchema.index({ folder: 1 });

export const Media = mongoose.models.Media || mongoose.model<IMedia>("Media", mediaSchema);
