import { useQuery } from "@tanstack/react-query";

export interface CMSProject {
  _id?: string;
  title: string;
  createdAt?: string | Date;
  category?: string;
  thumbnail?: string;
  shortDescription?: string;
  clientName?: string;
  mediaInfo?: {
    youtubeEmbed?: string;
    googleDriveEmbed?: string;
  };
}

export interface CMSService {
  number?: string;
  title: string;
  description: string;
}

export interface CMSSkill {
  name: string;
  role?: string;
  category?: string;
}

export interface CMSExperience {
  position?: string;
  role?: string;
  company?: string;
  org?: string;
  period?: string;
  years?: string;
  description?: string;
  note?: string;
}

export function useWebsiteSettings() {
  return useQuery({
    queryKey: ["website-settings"],
    queryFn: async () => {
      const res = await fetch("/api/settings");
      const json = await res.json();
      return json?.data || {};
    },
    staleTime: 1000 * 60 * 5, // 5 mins
    enabled: typeof window !== "undefined",
  });
}

export function useCMSProjects(all = false) {
  return useQuery<CMSProject[]>({
    queryKey: ["cms-projects", all],
    queryFn: async () => {
      const res = await fetch(`/api/projects${all ? "?all=true" : ""}`);
      const json = await res.json();
      return json?.data || [];
    },
    staleTime: 1000 * 60 * 2,
    enabled: typeof window !== "undefined",
  });
}

export function useCMSServices() {
  return useQuery<CMSService[]>({
    queryKey: ["cms-services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      const json = await res.json();
      return json?.data || [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: typeof window !== "undefined",
  });
}

export function useCMSSkills() {
  return useQuery<CMSSkill[]>({
    queryKey: ["cms-skills"],
    queryFn: async () => {
      const res = await fetch("/api/skills");
      const json = await res.json();
      return json?.data || [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: typeof window !== "undefined",
  });
}

export function useCMSExperience() {
  return useQuery<CMSExperience[]>({
    queryKey: ["cms-experience"],
    queryFn: async () => {
      const res = await fetch("/api/experience");
      const json = await res.json();
      return json?.data || [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: typeof window !== "undefined",
  });
}

export function useCMSEducation() {
  return useQuery({
    queryKey: ["cms-education"],
    queryFn: async () => {
      const res = await fetch("/api/education");
      const json = await res.json();
      return json?.data || [];
    },
    staleTime: 1000 * 60 * 5,
    enabled: typeof window !== "undefined",
  });
}
