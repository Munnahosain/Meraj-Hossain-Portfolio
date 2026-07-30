import mongoose, { Schema } from "mongoose";

export interface IEducation {
  _id?: string;
  institute: string;
  degree: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  certificate?: string;
  displayOrder: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const educationSchema = new Schema<IEducation>(
  {
    institute: { type: String, required: true },
    degree: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    certificate: String,
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Education =
  mongoose.models.Education || mongoose.model<IEducation>("Education", educationSchema);
