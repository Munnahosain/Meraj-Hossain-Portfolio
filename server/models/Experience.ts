import mongoose, { Schema } from "mongoose";

export interface IExperience {
  _id?: string;
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  companyLogo?: string;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const experienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    currentlyWorking: { type: Boolean, default: false },
    companyLogo: String,
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Experience =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", experienceSchema);
