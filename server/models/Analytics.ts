import { Schema, model } from "mongoose";

export interface IAnalytics {
  _id?: string;
  date: Date;
  totalVisitors: number;
  pageViews: number;
  projectViews: { projectId: string; views: number }[];
  resumeDownloads: number;
  contactClicks: number;
  trafficSource: { source: string; count: number }[];
  topProjects: { projectId: string; views: number }[];
  createdAt?: Date;
  updatedAt?: Date;
}

const analyticsSchema = new Schema<IAnalytics>(
  {
    date: { type: Date, default: Date.now },
    totalVisitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    projectViews: [
      {
        projectId: String,
        views: Number,
      },
    ],
    resumeDownloads: { type: Number, default: 0 },
    contactClicks: { type: Number, default: 0 },
    trafficSource: [
      {
        source: String,
        count: Number,
      },
    ],
    topProjects: [
      {
        projectId: String,
        views: Number,
      },
    ],
  },
  { timestamps: true },
);

export const Analytics = model<IAnalytics>("Analytics", analyticsSchema);
