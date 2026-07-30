/**
 * Media Helper Utility
 * Automatically parses and formats Google Drive links, YouTube links, and external URLs
 */

export interface ParsedMedia {
  type: "image" | "video" | "youtube" | "gdrive" | "unknown";
  originalUrl: string;
  embedUrl: string;
  streamUrl: string;
}

/**
 * Extracts Google Drive File ID from various link formats
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  const match =
    url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/id=([a-zA-Z0-9_-]+)/) ||
    url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/**
 * Extracts YouTube Video ID from various link formats (watch, shorts, share)
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
  );
  return match ? match[1] : null;
}

/**
 * Parses any media URL and returns optimized embed and stream URLs
 */
export function parseMediaUrl(url: string): ParsedMedia {
  if (!url) {
    return { type: "unknown", originalUrl: "", embedUrl: "", streamUrl: "" };
  }

  const cleanUrl = url.trim();

  // Check Google Drive
  const driveId = extractGoogleDriveId(cleanUrl);
  if (driveId) {
    return {
      type: "gdrive",
      originalUrl: cleanUrl,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      streamUrl: `https://lh3.googleusercontent.com/d/${driveId}`,
    };
  }

  // Check YouTube
  const youtubeId = extractYouTubeId(cleanUrl);
  if (youtubeId) {
    return {
      type: "youtube",
      originalUrl: cleanUrl,
      embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&rel=0`,
      streamUrl: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    };
  }

  // Check Direct Video file extensions
  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(cleanUrl)) {
    return {
      type: "video",
      originalUrl: cleanUrl,
      embedUrl: cleanUrl,
      streamUrl: cleanUrl,
    };
  }

  // Fallback to Image
  return {
    type: "image",
    originalUrl: cleanUrl,
    embedUrl: cleanUrl,
    streamUrl: cleanUrl,
  };
}
