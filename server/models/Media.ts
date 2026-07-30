import mongoose, { Schema } from "mongoose";

export interface IMedia {
  _id?: string;
  name: string;
  filename: string;
  url: string;
  publicId?: string;
  type: "image" | "video" | "pdf" | "document";
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
    name: { type: String, required: true },
    filename: { type: String, required: true },
    url: { type: String, required: true },
    publicId: String,
    type: { type: String, enum: ["image", "video", "pdf", "document"], required: true },
    size: { type: Number, required: true },
    mimeType: { type: String, required: true },
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

// Create index for search
mediaSchema.index({ name: "text", tags: "text" });
mediaSchema.index({ folder: 1 });

export const Media = mongoose.models.Media || mongoose.model<IMedia>("Media", mediaSchema);
