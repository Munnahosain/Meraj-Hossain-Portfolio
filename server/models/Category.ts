import mongoose, { Schema } from "mongoose";

export interface ICategory {
  _id?: string;
  name: string;
  icon?: string;
  description?: string;
  displayOrder: number;
  hidden: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    icon: String,
    description: String,
    displayOrder: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Category =
  mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema);
