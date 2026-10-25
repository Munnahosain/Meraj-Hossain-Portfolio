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
 * 3 Core Defined Color Themes:
 * 1. Day Light (12 PM - 5 PM):
 *    - Background: Clean crisp editorial off-white #F5F6F4
 *    - Text: Deep charcoal #121417
 * 2. Evening Green (Sunset to 9 PM):
 *    - Background: Deep, rich, unmistakable botanical emerald #10472E
 *    - Text: Crisp luminous light green #A7F3D0
 * 3. Night Pure Dark (10 PM - 5 AM):
 *    - Background: Obsidian pure dark #101114
 *    - Text: Clean night white #F3F4F6
 */
const COLOR_WHITE: ColorRGB = { r: 245, g: 246, b: 244 }; // #F5F6F4
const COLOR_GREEN: ColorRGB = { r: 16, g: 71, b: 46 };    // #10472E - Rich botanical emerald green
const COLOR_DARK: ColorRGB  = { r: 16, g: 17, b: 20 };    // #101114 - Deep obsidian dark

// Golden warmth for realistic sunset transition between white and green
const COLOR_SUNSET_WARM: ColorRGB = { r: 168, g: 176, b: 142 };

// Text Colors
const TEXT_DAY: ColorRGB         = { r: 18, g: 20, b: 23 };     // #121417
const TEXT_LIGHT_GREEN: ColorRGB = { r: 167, g: 243, b: 208 };  // #A7F3D0 luminous light green
const TEXT_NIGHT: ColorRGB       = { r: 243, g: 244, b: 246 };  // #F3F4F6

// Muted Text
const MUTED_DAY: ColorRGB         = { r: 107, g: 114, b: 128 };
const MUTED_LIGHT_GREEN: ColorRGB = { r: 110, g: 231, b: 183 }; // #6EE7B7
const MUTED_NIGHT: ColorRGB       = { r: 156, g: 163, b: 175 };

// Surfaces (cards, containers, modals)
const SURFACE_DAY: ColorRGB   = { r: 255, g: 255, b: 255 };
const SURFACE_GREEN: ColorRGB = { r: 24, g: 88, b: 59 };    // #18583B
const SURFACE_DARK: ColorRGB  = { r: 24, g: 26, b: 32 };    // #181A20

const HOVER_DAY: ColorRGB   = { r: 235, g: 237, b: 234 };
const HOVER_GREEN: ColorRGB = { r: 31, g: 111, b: 75 };    // #1F6F4B
const HOVER_DARK: ColorRGB  = { r: 32, g: 35, b: 43 };

/**
 * Smooth Hermite interpolation (smoothstep) with continuous derivatives at boundaries.
 */
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Calculates continuous, natural TimeTheme based on user specifications:
 * - 12:00 PM to 5:00 PM (12.0 - 17.0): Bright Daylight Lighting (#F5F6F4)
 * - 5:00 PM to 6:15 PM (17.0 - 18.25): Sunset smoothly transitioning into Evening Green
 * - 6:15 PM to 9:00 PM (18.25 - 21.0): Evening Green Theme ("sondhar por theke 9 ta porjonto")
 *                                      with deep green background (#10472E) & light green text (#A7F3D0)
 * - 9:00 PM to 10:15 PM (21.0 - 22.25): Dusk seamlessly transitioning green into pure dark night
 * - 10:15 PM to 4:45 AM (22.25 - 4.75): Pure Dark Obsidian Night Theme (#101114)
 * - 4:45 AM to 6:30 AM (4.75 - 6.5): Fajr & dawn sunrise gradual waking through morning glow
 * - 6:30 AM to 12:00 PM (6.5 - 12.0): Morning sun progressively brightening into midday daylight
 */
export function getTimeTheme(hour: number): TimeTheme {
  const h = ((hour % 24) + 24) % 24;

  let bgRgb: ColorRGB;
  let textRgb: ColorRGB;
  let mutedRgb: ColorRGB;
  let surfaceRgb: ColorRGB;
  let hoverRgb: ColorRGB;
  let themeName = '';
  let isLight = false;
  let isGreen = false;

  if (h >= 12 && h <= 17) {
    // 12:00 PM - 5:00 PM: Midday Bright Light Theme
    bgRgb = COLOR_WHITE;
    textRgb = TEXT_DAY;
    mutedRgb = MUTED_DAY;
    surfaceRgb = SURFACE_DAY;
    hoverRgb = HOVER_DAY;
    themeName = 'Day (Light)';
    isLight = true;
    isGreen = false;
  } else if (h > 17 && h < 18.25) {
    // 5:00 PM - 6:15 PM: Sunset into Evening Green
    const t = smoothstep(17, 18.25, h);
    // 2-phase interpolation via sunset warm sage for authentic atmospheric fill
    if (t < 0.5) {
      const subT = t * 2;
      bgRgb = lerpColor(COLOR_WHITE, COLOR_SUNSET_WARM, subT);
    } else {
      const subT = (t - 0.5) * 2;
      bgRgb = lerpColor(COLOR_SUNSET_WARM, COLOR_GREEN, subT);
    }
    textRgb = lerpColor(TEXT_DAY, TEXT_LIGHT_GREEN, t);
    mutedRgb = lerpColor(MUTED_DAY, MUTED_LIGHT_GREEN, t);
    surfaceRgb = lerpColor(SURFACE_DAY, SURFACE_GREEN, t);
    hoverRgb = lerpColor(HOVER_DAY, HOVER_GREEN, t);
    themeName = t < 0.5 ? 'Sunset' : 'Evening Green';
    isLight = t < 0.35;
    isGreen = t >= 0.35;
  } else if (h >= 18.25 && h <= 21) {
    // 6:15 PM - 9:00 PM: Evening Green Theme (sondhar por theke 9 ta porjonto)
    bgRgb = COLOR_GREEN;
    textRgb = TEXT_LIGHT_GREEN;
    mutedRgb = MUTED_LIGHT_GREEN;
    surfaceRgb = SURFACE_GREEN;
    hoverRgb = HOVER_GREEN;
    themeName = 'Evening (Green Theme)';
    isLight = false;
    isGreen = true;
  } else if (h > 21 && h < 22.25) {
    // 9:00 PM - 10:15 PM: Dusk fading from green to pure dark night
    const t = smoothstep(21, 22.25, h);
    bgRgb = lerpColor(COLOR_GREEN, COLOR_DARK, t);
    textRgb = lerpColor(TEXT_LIGHT_GREEN, TEXT_NIGHT, t);
    mutedRgb = lerpColor(MUTED_LIGHT_GREEN, MUTED_NIGHT, t);
    surfaceRgb = lerpColor(SURFACE_GREEN, SURFACE_DARK, t);
    hoverRgb = lerpColor(HOVER_GREEN, HOVER_DARK, t);
    themeName = t < 0.5 ? 'Dusk (Green Fading)' : 'Nightfall';
    isLight = false;
    isGreen = t < 0.45;
  } else if (h >= 22.25 || h <= 4.75) {
    // 10:15 PM - 4:45 AM: Pure Dark Obsidian Night Theme
    bgRgb = COLOR_DARK;
    textRgb = TEXT_NIGHT;
    mutedRgb = MUTED_NIGHT;
    surfaceRgb = SURFACE_DARK;
    hoverRgb = HOVER_DARK;
    themeName = 'Night (Pure Dark)';
    isLight = false;
    isGreen = false;
  } else if (h > 4.75 && h < 6.5) {
    // 4:45 AM - 6:30 AM: Fajr & Dawn sunrise waking through atmospheric dawn green
    const t = smoothstep(4.75, 6.5, h);
    bgRgb = lerpColor(COLOR_DARK, COLOR_GREEN, t);
    textRgb = lerpColor(TEXT_NIGHT, TEXT_LIGHT_GREEN, t);
    mutedRgb = lerpColor(MUTED_NIGHT, MUTED_LIGHT_GREEN, t);
    surfaceRgb = lerpColor(SURFACE_DARK, SURFACE_GREEN, t);
    hoverRgb = lerpColor(HOVER_DARK, HOVER_GREEN, t);
    themeName = 'Fajr / Dawn';
    isLight = false;
    isGreen = t >= 0.4;
  } else {
    // 6:30 AM - 12:00 PM: Morning sun brightening into full daylight
    const t = smoothstep(6.5, 12, h);
    if (t < 0.5) {
      const subT = t * 2;
      bgRgb = lerpColor(COLOR_GREEN, COLOR_SUNSET_WARM, subT);
    } else {
      const subT = (t - 0.5) * 2;
      bgRgb = lerpColor(COLOR_SUNSET_WARM, COLOR_WHITE, subT);
    }
    textRgb = lerpColor(TEXT_LIGHT_GREEN, TEXT_DAY, t);
    mutedRgb = lerpColor(MUTED_LIGHT_GREEN, MUTED_DAY, t);
    surfaceRgb = lerpColor(SURFACE_GREEN, SURFACE_DAY, t);
    hoverRgb = lerpColor(HOVER_GREEN, HOVER_DAY, t);
    themeName = t < 0.5 ? 'Morning' : 'Midday';
    isLight = t >= 0.5;
    isGreen = t < 0.35;
  }

  const bgHex = rgbToHex(bgRgb);
  const textHex = rgbToHex(textRgb);
  const mutedHex = rgbToHex(mutedRgb);
  const surfaceHex = rgbToHex(surfaceRgb);
  const hoverHex = rgbToHex(hoverRgb);

  const border = isLight
    ? 'rgba(18, 20, 23, 0.18)'
    : isGreen
    ? 'rgba(167, 243, 208, 0.32)'
    : 'rgba(255, 255, 255, 0.22)';

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
