import mongoose, { Schema } from "mongoose";

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  category: string; // Category ID
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  galleryImages: string[];
  googleDriveLink?: string;
  liveWebsite?: string;
  behanceLink?: string;
  githubLink?: string;
  youtubeLink?: string;
  clientName?: string;
  completionDate?: Date;
  softwareUsed: string[];
  tags: string[];
  featured: boolean;
  hidden: boolean;
  displayOrder: number;
  status: "draft" | "published";
  createdAt?: Date;
  updatedAt?: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    thumbnail: { type: String, required: true },
    galleryImages: [String],
    googleDriveLink: String,
    liveWebsite: String,
    behanceLink: String,
    githubLink: String,
    youtubeLink: String,
    clientName: String,
    completionDate: Date,
    softwareUsed: [String],
    tags: [String],
    featured: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

// Create index for slug
projectSchema.index({ slug: 1 });

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);
