/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TimeTheme } from '../types';

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export function rgbToHex({ r, g, b }: ColorRGB): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function lerpColor(c1: ColorRGB, c2: ColorRGB, t: number): ColorRGB {
  return {
    r: c1.r + (c2.r - c1.r) * t,
    g: c1.g + (c2.g - c1.g) * t,
    b: c1.b + (c2.b - c1.b) * t,
  };
}

/**
 * Standard WCAG 2.1 Relative Luminance computation
 */
export function getLuminance({ r, g, b }: ColorRGB): number {
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const s = Math.max(0, Math.min(255, val)) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(lum1: number, lum2: number): number {
  const l1 = Math.max(lum1, lum2);
  const l2 = Math.min(lum1, lum2);
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * 3 Core Defined Color Themes + Smooth Natural Transitions:
 * 1. Day Light (11:30 AM - 5:00 PM):
 *    - Background: Clean crisp editorial off-white #F5F6F4
 *    - Text: Deep charcoal #121417 (Luminance ~0.015, Contrast > 15:1)
 * 2. Sunset (5:00 PM - 6:15 PM):
 *    - Background: Sunset warm olive/sage transitioning into deep emerald green
 *    - Text: Pure crisp White #FFFFFF as soon as background deepens
 * 3. Evening Green (6:15 PM - 9:00 PM):
 *    - Background: Deep botanical emerald #10472E
 *    - Text: Crisp pure White #FFFFFF / Luminous #A7F3D0
 * 4. Dusk & Pure Dark Night (9:00 PM - 4:45 AM):
 *    - Background: Obsidian pure dark #101114
 *    - Text: Crisp pure White #FFFFFF / #F3F4F6
 * 5. Fajr & Dawn (4:45 AM - 6:30 AM):
 *    - Background: Obsidian transitioning through atmospheric morning green
 *    - Text: Crisp pure White #FFFFFF
 * 6. Morning (6:30 AM - 11:30 AM):
 *    - Background: Morning olive green (at 8:00 AM - 9:00 AM) transitioning into daylight off-white
 *    - Text: High-contrast pure White #FFFFFF during the olive/sage green morning phase,
 *      ensuring zero contrast blending with the background. Automatically transitions into
 *      deep charcoal #121417 as daytime brightens!
 */
const COLOR_WHITE: ColorRGB         = { r: 245, g: 246, b: 244 }; // #F5F6F4 Clean crisp off-white
const COLOR_GREEN: ColorRGB         = { r: 16, g: 71, b: 46 };    // #10472E Rich botanical emerald green
const COLOR_DARK: ColorRGB          = { r: 16, g: 17, b: 20 };    // #101114 Deep obsidian dark
const COLOR_MORNING_OLIVE: ColorRGB = { r: 84, g: 98, b: 74 };   // Earthy morning olive green
const COLOR_SUNSET_WARM: ColorRGB   = { r: 104, g: 114, b: 88 };  // Warm dusk olive/sage

/**
 * Smooth Hermite interpolation (smoothstep) with continuous derivatives at boundaries.
 */
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export function getTimeTheme(hour: number): TimeTheme {
  const h = ((hour % 24) + 24) % 24;

  let bgRgb: ColorRGB;
  let themeName = '';
  let isGreen = false;

  if (h >= 11.5 && h <= 17) {
    // 11:30 AM - 5:00 PM: Midday Bright Light Theme
    bgRgb = COLOR_WHITE;
    themeName = 'Day (Light)';
    isGreen = false;
  } else if (h > 17 && h < 18.25) {
    // 5:00 PM - 6:15 PM: Sunset into Evening Green
    const t = smoothstep(17, 18.25, h);
    if (t < 0.5) {
      const subT = t * 2;
      bgRgb = lerpColor(COLOR_WHITE, COLOR_SUNSET_WARM, subT);
    } else {
      const subT = (t - 0.5) * 2;
      bgRgb = lerpColor(COLOR_SUNSET_WARM, COLOR_GREEN, subT);
    }
    themeName = t < 0.5 ? 'Sunset' : 'Evening Green';
    isGreen = true;
  } else if (h >= 18.25 && h <= 21) {
    // 6:15 PM - 9:00 PM: Evening Green Theme
    bgRgb = COLOR_GREEN;
    themeName = 'Evening (Green Theme)';
    isGreen = true;
  } else if (h > 21 && h < 22.25) {
    // 9:00 PM - 10:15 PM: Dusk fading from green to pure dark night
    const t = smoothstep(21, 22.25, h);
    bgRgb = lerpColor(COLOR_GREEN, COLOR_DARK, t);
    themeName = t < 0.5 ? 'Dusk (Green Fading)' : 'Nightfall';
    isGreen = t < 0.45;
  } else if (h >= 22.25 || h <= 4.75) {
    // 10:15 PM - 4:45 AM: Pure Dark Obsidian Night Theme
    bgRgb = COLOR_DARK;
    themeName = 'Night (Pure Dark)';
    isGreen = false;
  } else if (h > 4.75 && h < 6.5) {
    // 4:45 AM - 6:30 AM: Fajr & Dawn sunrise waking through atmospheric dawn green
    const t = smoothstep(4.75, 6.5, h);
    bgRgb = lerpColor(COLOR_DARK, COLOR_GREEN, t);
    themeName = 'Fajr / Dawn';
    isGreen = true;
  } else {
    // 6:30 AM - 11:30 AM: Morning sun brightening from morning green through olive into daylight off-white
    const t = smoothstep(6.5, 11.5, h);
    if (t < 0.5) {
      const subT = t * 2;
      bgRgb = lerpColor(COLOR_GREEN, COLOR_MORNING_OLIVE, subT);
    } else {
      const subT = (t - 0.5) * 2;
      bgRgb = lerpColor(COLOR_MORNING_OLIVE, COLOR_WHITE, subT);
    }
    themeName = t < 0.4 ? 'Morning (Dawn)' : t < 0.75 ? 'Morning' : 'Midday';
    isGreen = t < 0.65;
  }

  // Automatic Contrast Engine:
  // Evaluates relative background luminance to guarantee optimal text contrast.
  // In olive/sage morning, dawn, evening green, and night: text is crisp pure White #FFFFFF.
  // In bright daytime daylight: text is deep charcoal #121417.
  const lum = getLuminance(bgRgb);

  let textRgb: ColorRGB;
  let mutedRgb: ColorRGB;
  let surfaceRgb: ColorRGB;
  let hoverRgb: ColorRGB;
  let border: string;
  let isLight: boolean;

  if (lum >= 0.50) {
    // High-luminance daylight: crisp dark charcoal typography
    textRgb = { r: 18, g: 20, b: 23 };      // #121417
    mutedRgb = { r: 92, g: 100, b: 112 };   // #5C6470
    surfaceRgb = { r: 255, g: 255, b: 255 };
    hoverRgb = { r: 235, g: 237, b: 234 };
    border = 'rgba(18, 20, 23, 0.22)';
    isLight = true;
  } else if (lum <= 0.42) {
    // Low-to-medium luminance (Morning Olive, Dawn, Evening Green, Dark Night):
    // Pure crisp white text ensures 100% readability without blending into background!
    textRgb = { r: 255, g: 255, b: 255 };   // #FFFFFF
    mutedRgb = { r: 220, g: 226, b: 222 };  // #DAE2DE
    surfaceRgb = isGreen ? { r: 22, g: 30, b: 24 } : { r: 24, g: 26, b: 32 };
    hoverRgb = isGreen ? { r: 32, g: 42, b: 34 } : { r: 32, g: 35, b: 43 };
    border = 'rgba(255, 255, 255, 0.35)';
    isLight = false;
  } else {
    // Narrow smooth transition band between 0.42 and 0.50 luminance
    const blend = smoothstep(0.42, 0.50, lum);
    textRgb = lerpColor({ r: 255, g: 255, b: 255 }, { r: 18, g: 20, b: 23 }, blend);
    mutedRgb = lerpColor({ r: 220, g: 226, b: 222 }, { r: 92, g: 100, b: 112 }, blend);
    isLight = blend >= 0.5;
    surfaceRgb = isLight ? { r: 255, g: 255, b: 255 } : { r: 24, g: 28, b: 24 };
    hoverRgb = isLight ? { r: 235, g: 237, b: 234 } : { r: 32, g: 40, b: 34 };
    border = isLight ? 'rgba(18, 20, 23, 0.22)' : 'rgba(255, 255, 255, 0.35)';
  }

  const bgHex = rgbToHex(bgRgb);
  const textHex = rgbToHex(textRgb);
  const mutedHex = rgbToHex(mutedRgb);
  const surfaceHex = rgbToHex(surfaceRgb);
  const hoverHex = rgbToHex(hoverRgb);

  return {
    name: themeName,
    bg: bgHex,
    text: textHex,
    textMuted: mutedHex,
    surface: surfaceHex,
    surfaceHover: hoverHex,
    border,
    accent: '#18C98A',
    isLight,
    isGreen,
  };
}
