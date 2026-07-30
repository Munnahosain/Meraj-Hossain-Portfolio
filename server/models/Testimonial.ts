import { Schema, model } from "mongoose";

export interface ITestimonial {
  _id?: string;
  clientName: string;
  company?: string;
  image?: string;
  review: string;
  rating: number;
  displayOrder: number;
  hidden: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    company: String,
    image: String,
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    displayOrder: { type: Number, default: 0 },
    hidden: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Testimonial = model<ITestimonial>("Testimonial", testimonialSchema);
