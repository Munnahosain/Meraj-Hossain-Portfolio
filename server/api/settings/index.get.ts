import { connectDB } from "~/server/utils/db";
import { WebsiteSettings } from "~/server/models/WebsiteSettings";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    let settings = await WebsiteSettings.findOne();

    // If no settings exist, create default ones
    if (!settings) {
      settings = await WebsiteSettings.create({
        branding: {
          websiteName: "Creative Canvas Hub",
          websiteLogo: "/MCU-LOGO-0.2V-1.png",
          darkLogo: "",
          lightLogo: "",
          footerLogo: "/MCU-LOGO-0.2V-1.png",
          favicon: "",
          browserTitle: "Creative Canvas Hub",
        },
        general: {
          ownerName: "Meraj Hossain",
          profession: "Graphics Designer & Motion Artist",
          tagline: "Building brands, cuts, and animations",
          shortDescription: "Portfolio of creative work",
        },
        contact: {
          email: "",
          phone: "",
          whatsapp: "",
          address: "",
          googleMapsLink: "",
        },
        social: {
          facebook: { url: "", enabled: false },
          linkedin: { url: "", enabled: false },
          behance: { url: "", enabled: false },
          dribbble: { url: "", enabled: false },
          github: { url: "", enabled: false },
          instagram: { url: "", enabled: false },
          youtube: { url: "", enabled: false },
          twitter: { url: "", enabled: false },
        },
        hero: {
          title: "Meraj",
          subtitle: "Hossain",
          description: "Graphics designer, video editor and motion graphics artist",
          backgroundImage: "",
          profileImage: "",
          reelImages: [],
          resumePdf: "",
          resumeButtonText: "Download Resume",
          hireMeButtonText: "Hire Me",
          contactButtonText: "Contact",
        },
        about: {
          title: "About Me",
          description: "",
          experience: "",
          location: "",
          languages: "",
          birthday: "",
          nationality: "",
          availability: "",
          yearsOfExperience: 0,
          profileImage: "",
          cv: "",
        },
        theme: {
          primaryColor: "#ffffff",
          secondaryColor: "#000000",
          accentColor: "#ff0000",
          backgroundColor: "#000000",
          textColor: "#ffffff",
          fontFamily: "system-ui",
          borderRadius: "0.5rem",
          darkMode: true,
        },
        seo: {
          homepageTitle: "Meraj Hossain — Graphics Designer & Motion Artist",
          metaTitle: "Meraj Hossain — Graphics Designer & Motion Artist",
          metaDescription:
            "Portfolio of Meraj Hossain — Graphics Designer, Video Editor and Motion Graphics Designer",
          keywords: ["graphics design", "motion graphics", "video editing"],
          canonicalUrl: "",
          ogImage: "",
          twitterCard: "summary_large_image",
          robots: "index, follow",
          sitemap: "",
        },
      });
    }

    return {
      success: true,
      data: settings,
    };
  } catch (error) {
    console.error("Get settings error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch website settings",
    });
  }
});
