import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import reel1 from "@/assets/reel-01.jpg";
import reel2 from "@/assets/reel-02.jpg";
import reel3 from "@/assets/reel-03.jpg";
import reel4 from "@/assets/reel-04.jpg";
import reel5 from "@/assets/reel-05.jpg";
import reel6 from "@/assets/reel-06.jpg";
import reel7 from "@/assets/reel-07.jpg";

const legacyImageSources: Record<string, string> = {
  "/assets/reel-01.jpg": reel1,
  "/assets/reel-02.jpg": reel2,
  "/assets/reel-03.jpg": reel3,
  "/assets/reel-04.jpg": reel4,
  "/assets/reel-05.jpg": reel5,
  "/assets/reel-06.jpg": reel6,
  "/assets/reel-07.jpg": reel7,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageSrc(src: string) {
  if (src.startsWith("/uploads/")) {
    return `/api/uploads/${encodeURIComponent(src.split("/").pop() || "")}`;
  }
  return legacyImageSources[src] || src;
}
