import mongoose, { Schema } from "mongoose";

export interface IService {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  displayOrder: number;
  hidden: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const serviceSchema = new Schema<IService>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: String,
    displayOrder: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", serviceSchema);
