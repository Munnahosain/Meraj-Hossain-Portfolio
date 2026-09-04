import mongoose, { Schema } from "mongoose";

export interface WebsiteSettingsData {
  branding: {
    websiteName: string;
    websiteLogo: string;
    darkLogo: string;
    lightLogo: string;
    footerLogo: string;
    favicon: string;
    browserTitle: string;
  };
  general: {
    ownerName: string;
    profession: string;
    tagline: string;
    shortDescription: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    googleMapsLink: string;
  };
  social: {
    facebook: { url: string; enabled: boolean };
    linkedin: { url: string; enabled: boolean };
    behance: { url: string; enabled: boolean };
    dribbble: { url: string; enabled: boolean };
    github: { url: string; enabled: boolean };
    instagram: { url: string; enabled: boolean };
    youtube: { url: string; enabled: boolean };
    twitter: { url: string; enabled: boolean };
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: string;
    profileImage: string;
    reelImages: string[];
    resumePdf: string;
    resumeButtonText: string;
    hireMeButtonText: string;
    contactButtonText: string;
  };
  about: {
    title: string;
    description: string;
    experience: string;
    location: string;
    languages: string;
    birthday: string;
    nationality: string;
    availability: string;
    yearsOfExperience: number;
    profileImage: string;
    cv: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    borderRadius: string;
    darkMode: boolean;
  };
  seo: {
    homepageTitle: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl: string;
    ogImage: string;
    twitterCard: string;
    robots: string;
    sitemap: string;
  };
}

export interface IWebsiteSettings extends WebsiteSettingsData {
  _id?: string;
  updatedBy?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

const websiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    branding: {
      websiteName: { type: String, default: "Creative Canvas Hub" },
      websiteLogo: String,
      darkLogo: String,
      lightLogo: String,
      footerLogo: String,
      favicon: String,
      browserTitle: String,
    },
    general: {
      ownerName: String,
      profession: String,
      tagline: String,
      shortDescription: String,
    },
    contact: {
      email: String,
      phone: String,
      whatsapp: String,
      address: String,
      googleMapsLink: String,
    },
    social: {
      facebook: { url: String, enabled: Boolean },
      linkedin: { url: String, enabled: Boolean },
      behance: { url: String, enabled: Boolean },
      dribbble: { url: String, enabled: Boolean },
      github: { url: String, enabled: Boolean },
      instagram: { url: String, enabled: Boolean },
      youtube: { url: String, enabled: Boolean },
      twitter: { url: String, enabled: Boolean },
    },
    hero: {
      title: String,
      subtitle: String,
      description: String,
      backgroundImage: String,
      profileImage: String,
      reelImages: [String],
      resumePdf: String,
      resumeButtonText: { type: String, default: "Download Resume" },
      hireMeButtonText: { type: String, default: "Hire Me" },
      contactButtonText: { type: String, default: "Contact" },
    },
    about: {
      title: String,
      description: String,
      experience: String,
      location: String,
      languages: String,
      birthday: String,
      nationality: String,
      availability: String,
      yearsOfExperience: Number,
      profileImage: String,
      cv: String,
    },
    theme: {
      primaryColor: { type: String, default: "#ffffff" },
      secondaryColor: { type: String, default: "#000000" },
      accentColor: { type: String, default: "#ff0000" },
      backgroundColor: { type: String, default: "#000000" },
      textColor: { type: String, default: "#ffffff" },
      fontFamily: { type: String, default: "system-ui" },
      borderRadius: { type: String, default: "0.5rem" },
      darkMode: { type: Boolean, default: true },
    },
    seo: {
      homepageTitle: String,
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
      canonicalUrl: String,
      ogImage: String,
      twitterCard: String,
      robots: String,
      sitemap: String,
    },
    updatedBy: String,
  },
  { timestamps: true },
);

export const WebsiteSettings =
  mongoose.models.WebsiteSettings ||
  mongoose.model<IWebsiteSettings>("WebsiteSettings", websiteSettingsSchema);
