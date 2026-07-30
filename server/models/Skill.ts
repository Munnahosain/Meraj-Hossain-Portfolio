import mongoose, { Schema } from "mongoose";

export interface ISkill {
  _id?: string;
  name: string;
  percentage: number;
  category?: string;
  icon?: string;
  color?: string;
  displayOrder: number;
  hidden: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    category: String,
    icon: String,
    color: String,
    displayOrder: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Skill = mongoose.models.Skill || mongoose.model<ISkill>("Skill", skillSchema);
