import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  googleId?: string;
  passwordHash?: string;
  name: string;
  picture?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    googleId: { type: String, unique: true, sparse: true },
    passwordHash: String,
    name: { type: String, required: true },
    picture: String,
    lastLogin: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const User =
  (mongoose.models.User as mongoose.Model<IUser> | undefined) ||
  mongoose.model<IUser>("User", userSchema);
