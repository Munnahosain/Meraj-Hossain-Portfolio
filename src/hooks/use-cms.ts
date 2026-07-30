import { useQuery } from "@tanstack/react-query";

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
  return useQuery({
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
  return useQuery({
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
  return useQuery({
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
  return useQuery({
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
