# Implementation Plan: Brandon Yasin Style Deck Dealing & Silky Shutter Animation

Enhance the intro sequence inspired by `brandonyasin.com` with a silky cinematic shutter drop followed by a fluid, sequential deck dealing motion: right card deals first, then left card deals out, and finally the center featured card settles into place.

## User Decisions & Preferences
- **Dealing Sequence**: Deal the right card first, then left card, then center card into place.
- **Shutter Motion Feel**: Silky cinematic curve with friction-free deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Zero Frame Drops**: Pre-calculated offsets, pure GPU transforms (`translate3d`), zero duplicate DOM overlays, and `requestAnimationFrame` timeline scheduling.

---

## Proposed Changes

### 1. Silky Cinematic Shutter Drop Overhaul
- **File**: `src/components/GalleryHome.tsx`
- Replace discrete drops with refined, friction-free acceleration and deceleration curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Harmonize the 4 progressive drops:
  - Drop 1 & 2: Smooth editorial entry (560ms, graceful deceleration).
  - Drop 3: Accelerated transition (380ms).
  - Drop 4: Final hero image lands crisp with zero jitter or flicker (320ms).
- Ensure cards stay locked on hardware-accelerated layers with `will-change: transform` and `backface-visibility: hidden`.

### 2. Sequential Deck Dealing Choreography (Right -> Left -> Center)
- **File**: `src/components/GalleryHome.tsx`
- Maintain cards stacked at viewport center during the shutter phase using pre-measured center offsets.
- When the 4th shutter drops and lands, trigger a 3-step staged deal-out:
  1. **Step 1 (Deal Right)**: Cards to the right (starting with immediate right card `index 1`) deal out to their natural horizontal track slot with smooth momentum.
  2. **Step 2 (Deal Left)**: Cards to the left (card `index -1` / previous project) deal out to their resting slot on the left.
  3. **Step 3 (Settle Center)**: The center hero card (Card 0) locks into its primary focal position as the main content card.
  4. Peripheral track cards smoothly cascade into place with staggered opacity.
- Seamlessly transition from `dealing` to `interactive` without snapping or sudden position shifts.

### 3. Smooth 60fps / 120fps Engine Optimization
- Remove any dynamic layout reads (`getBoundingClientRect`, `offsetLeft`) from within the animation timeline; all track and card dimensions are pre-calculated during the initial measurement phase.
- Synchronize track scroll position (`scrollLeft`) with the middle set so interactive scrolling immediately picks up right where the deal sequence settled.

---

## Verification Plan

### Automated Verification
- Run `compile_applet` to confirm error-free Vite build and bundling.
- Run `lint_applet` to check for syntax, TypeScript types, and styling consistency.

### Manual / Visual Verification
- Observe intro loading animation on fresh load:
  - 4 shutter images drop with silky, friction-free deceleration.
  - Final card seamlessly becomes the hero card without double image overlays or flashes.
  - Right card deals first, followed by the left card, followed by the center card settling.
  - Interactive drag, mouse wheel physics bounce, and timeline scrubber remain completely responsive.
