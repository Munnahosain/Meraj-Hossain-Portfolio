import { connectDB } from "./db";
import { WebsiteSettings } from "../models/WebsiteSettings";
import { Service } from "../models/Service";
import { Skill } from "../models/Skill";
import { Experience } from "../models/Experience";
import { Education } from "../models/Education";
import { Category } from "../models/Category";
import { Project } from "../models/Project";

export async function ensureInitialSeed() {
  try {
    await connectDB();

    // 1. Website Settings
    const existingSettings = await WebsiteSettings.findOne();
    if (!existingSettings) {
      await WebsiteSettings.create({
        branding: {
          websiteName: "Meraj Hossain",
          browserTitle: "Meraj Hossain — Graphics & Motion Designer",
          websiteLogo: "",
          favicon: "/favicon.ico",
        },
        general: {
          ownerName: "Meraj Hossain",
          profession: "Graphics Designer & Motion Artist",
          tagline: "Visual Storyteller · Video Editor · Motion Artist",
          shortDescription:
            "Graphics designer, video editor and motion graphics artist based in Dhaka, Bangladesh.",
        },
        contact: {
          email: "merajhossain042@gmail.com",
          phone: "+880 1700 000 000",
          whatsapp: "+8801700000000",
          address: "Dhaka, Bangladesh",
          googleMapsLink: "",
        },
        social: {
          facebook: { url: "https://facebook.com", enabled: true },
          linkedin: { url: "https://linkedin.com", enabled: true },
          behance: { url: "https://behance.net", enabled: true },
          dribbble: { url: "https://dribbble.com", enabled: true },
          github: { url: "https://github.com", enabled: true },
          instagram: { url: "https://instagram.com", enabled: true },
          youtube: { url: "https://youtube.com", enabled: true },
          twitter: { url: "https://x.com", enabled: true },
        },
        hero: {
          title: "Meraj Hossain",
          subtitle: "Graphics Designer · Video Editor · Motion Artist",
          description: "Turning briefs into visual moments people remember.",
          resumeButtonText: "Download Resume",
          hireMeButtonText: "Hire Me",
          contactButtonText: "Contact Studio",
        },
        about: {
          title: "About Meraj",
          description:
            "Specializing in branding design, video editing, motion graphics, and visual storytelling.",
          experience: "4+ Years",
          location: "Dhaka, Bangladesh",
          languages: "English, Bengali",
          birthday: "October 15",
          nationality: "Bangladeshi",
          availability: "Available for Freelance & Full-time",
          yearsOfExperience: 4,
        },
        seo: {
          homepageTitle: "Meraj Hossain — Graphics & Motion Designer",
          metaTitle: "Meraj Hossain Portfolio",
          metaDescription:
            "Graphics Designer, Video Editor and Motion Graphics Designer based in Dhaka, Bangladesh.",
          keywords: ["Graphics Design", "Motion Graphics", "Video Editing", "Branding", "Dhaka"],
        },
      });
      console.log("✓ Seeded default WebsiteSettings");
    }

    // 2. Categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany([
        {
          name: "Branding",
          slug: "branding",
          description: "Brand identity & print",
          displayOrder: 1,
        },
        {
          name: "Motion Graphics",
          slug: "motion-graphics",
          description: "Kinetic typography & animations",
          displayOrder: 2,
        },
        {
          name: "Video Editing",
          slug: "video-editing",
          description: "Reels, promo cuts & post-production",
          displayOrder: 3,
        },
        {
          name: "Promo & Color",
          slug: "promo-color",
          description: "Commercial cutdowns & color grading",
          displayOrder: 4,
        },
      ]);
      console.log("✓ Seeded default Categories");
    }

    // 3. Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        {
          number: "01",
          title: "Graphic Design",
          description:
            "Posters, social creatives, and print collateral built with typographic precision.",
          icon: "Palette",
          displayOrder: 1,
          active: true,
        },
        {
          number: "02",
          title: "Motion Graphics",
          description: "Kinetic type, logo stings, and animated explainers in After Effects.",
          icon: "Film",
          displayOrder: 2,
          active: true,
        },
        {
          number: "03",
          title: "Video Editing",
          description: "Story-driven cuts for reels, ads, and long-form in Premiere Pro.",
          icon: "Video",
          displayOrder: 3,
          active: true,
        },
        {
          number: "04",
          title: "Color Grading",
          description: "Cinematic looks and consistent finishing across every deliverable.",
          icon: "Sliders",
          displayOrder: 4,
          active: true,
        },
        {
          number: "05",
          title: "Branding Design",
          description: "Logo systems, guidelines, and identity that scales across media.",
          icon: "Sparkles",
          displayOrder: 5,
          active: true,
        },
        {
          number: "06",
          title: "Visual Storytelling",
          description: "Concept to screen — turning briefs into moments people remember.",
          icon: "Layout",
          displayOrder: 6,
          active: true,
        },
      ]);
      console.log("✓ Seeded default Services");
    }

    // 4. Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany([
        {
          name: "Adobe Photoshop",
          category: "Software",
          role: "Retouch · Composite",
          percentage: 95,
          displayOrder: 1,
          active: true,
        },
        {
          name: "Adobe Illustrator",
          category: "Software",
          role: "Vector · Logo System",
          percentage: 90,
          displayOrder: 2,
          active: true,
        },
        {
          name: "Adobe After Effects",
          category: "Software",
          role: "Motion · Kinetic Type",
          percentage: 92,
          displayOrder: 3,
          active: true,
        },
        {
          name: "Adobe Premiere Pro",
          category: "Software",
          role: "Video Edit · Color Grading",
          percentage: 88,
          displayOrder: 4,
          active: true,
        },
      ]);
      console.log("✓ Seeded default Skills");
    }

    // 5. Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany([
        {
          title: "Micro Electronic Campaign",
          slug: "micro-electronic-campaign",
          category: "Branding",
          shortDescription:
            "Complete branding and print collateral for tech hardware product launch.",
          fullDescription:
            "Designed high-impact print posters, social media campaign kits, and product packaging for a national electronics launch.",
          thumbnail: "/assets/reel-01.jpg",
          galleryImages: ["/assets/reel-01.jpg"],
          featured: true,
          hidden: false,
          displayOrder: 1,
          status: "published",
          tags: ["Branding", "Print", "Tech"],
        },
        {
          title: "Adobe Stock — Motion Pack",
          slug: "adobe-stock-motion-pack",
          category: "Motion Graphics",
          shortDescription: "Kinetic title templates and lower-thirds package for video creators.",
          fullDescription:
            "Custom After Effects motion graphics templates created for stock licensing.",
          thumbnail: "/assets/reel-03.jpg",
          galleryImages: ["/assets/reel-03.jpg"],
          featured: true,
          hidden: false,
          displayOrder: 2,
          status: "published",
          tags: ["Motion Graphics", "After Effects", "Templates"],
        },
        {
          title: "Social Reels Series",
          slug: "social-reels-series",
          category: "Video Editing",
          shortDescription:
            "Fast-paced, engagement-optimized short form video cuts for digital brands.",
          fullDescription:
            "Edited high-converting vertical reel series with dynamic captions, sound design, and speed ramping.",
          thumbnail: "/assets/reel-05.jpg",
          galleryImages: ["/assets/reel-05.jpg"],
          featured: true,
          hidden: false,
          displayOrder: 3,
          status: "published",
          tags: ["Video Editing", "Reels", "Shorts"],
        },
        {
          title: "Promo Cutdowns",
          slug: "promo-cutdowns",
          category: "Promo & Color",
          shortDescription: "Cinematic commercial cutdowns and color grading for brand campaign.",
          fullDescription:
            "Color-graded and master-edited commercial promos for broadcast and web.",
          thumbnail: "/assets/reel-06.jpg",
          galleryImages: ["/assets/reel-06.jpg"],
          featured: true,
          hidden: false,
          displayOrder: 4,
          status: "published",
          tags: ["Promo", "Color Grading", "Commercial"],
        },
      ]);
      console.log("✓ Seeded default Projects");
    }
  } catch (error) {
    console.error("Seed defaults error:", error);
  }
}
