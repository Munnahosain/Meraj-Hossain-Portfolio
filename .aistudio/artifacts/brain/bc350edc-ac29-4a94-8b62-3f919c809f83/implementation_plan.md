# Brandon Yasin Motion System Recreation for Meraj Hossain Portfolio

Recreation of the award-winning Brandon Yasin (`brandonyasin.com`) motion choreography and interaction mechanics within Meraj Hossain's visual design portfolio, featuring momentum horizontal track scrolling with velocity-driven skew, an unfolding 3-card physical magazine navigation deck, dynamic diurnal time dial, and Lenis/GSAP scroll-linked transitions.

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction below synthesizes the confirmed decisions from Phase 1:
> - **Motion Architecture**: GSAP ScrollTrigger + Lenis for pinned scroll and page transitions, paired with Motion for React (`framer-motion`) for UI states and micro-interactions.
> - **Horizontal Project Showcase**: Friction-damped momentum scrolling with wheel scrub, drag gestures, subtle image parallax, and velocity-responsive skew.
> - **Editorial Navigation**: 3-panel physical magazine deck with perspective unfolding, synchronized card heights, and fixed `#353B2D` olive-green backdrop.

| Reference Feature | Where It Appears | Behavior & Dynamics | Recommended Implementation | Target Components | Performance & Accessibility |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Momentum Horizontal Reel** | Home Showcase (`/`) | Drag & wheel scrub with inertia, friction damping, velocity skew ($\pm 4^\circ$), and progressive scale | Custom friction loop + Framer Motion gesture physics + transform-only animation | `src/components/GalleryHome.tsx`, `src/utils/frictionScroll.ts` | Compositor-only `transform: translate3d(...) skewX(...)`; bypasses skew on `prefers-reduced-motion` |
| **Unfolding 3-Card Magazine Deck** | Navigation Overlay (`Header` menu click) | Main viewport shrinks into Card 1 while Cards 2 & 3 fan out side-by-side with perspective depth | Framer Motion shared layout + `useTransform` spring interpolations | `src/components/EditorialDeckCards.tsx`, `src/App.tsx`, `src/components/MagazineMenu.tsx` | Fixed dark olive green (`#353B2D`) backdrop; responsive single-card stack fallback on mobile |
| **Scroll-Driven Detail Reveals** | Case Studies (`CaseStudyView`) | Pinned metadata sidebar, fluid vertical scroll, staggered title reveals, scale-down hero image | GSAP `ScrollTrigger` + `useLenis` smooth scroll wrapper | `src/components/CaseStudyView.tsx`, `src/hooks/useLenis.ts` | Lenis throttled during dragging/modal states; hardware-accelerated transforms |
| **Diurnal Time Dial ("Time Travel")** | Global Header / Clock Widget | Interactive 24h scrubber dynamically re-tinting ambient colors from sunrise gold to midnight obsidian | Pure React state + CSS variable root bindings (`theme.bg`, `theme.text`) | `src/components/Header.tsx`, `src/utils/timeColor.ts`, `src/App.tsx` | Instant 60fps CSS color interpolation with zero layout reflows |
| **Archive Preview Grid** | Archive View (`ArchiveView`) | Dense video/project index with floating preview card on cursor hover and instant filter transitions | Framer Motion `AnimatePresence` + cursor tracking spring physics | `src/components/ArchiveView.tsx`, `src/components/CustomCursor.tsx` | Cursor preview hidden on touch devices; GPU layers isolated |
| **Tactile Contact Monograph** | Contact Modal (`ContactModal`) | Textured paper backdrop sliding up with smooth cubic-bezier easing and floating input focus | Framer Motion backdrop + spring dialog transition | `src/components/ContactModal.tsx` | `Escape` key capture, focus trap, and touch swipe-to-dismiss |

---

## 1. Overview & Core Concept

- **What It Does**: Upgrades Meraj Hossain's motion and visual design portfolio with the fluidity, kinetic rhythm, and editorial elegance of Brandon Yasin's portfolio. Users experience a friction-driven project reel on the home view, an interactive time dial that reflects Dhaka local time or manual time travel, an unfolding 3-card magazine menu, and smooth scroll-linked case studies.
- **Target Audience**: Global creative agencies, film directors, brand studios, and design leads evaluating Meraj Hossain for high-end motion graphics and visual storytelling.
- **Key Value**: Delivers an Awwwards-caliber portfolio experience while keeping 100% of Meraj's identity, motion assets, and existing fullstack CMS capabilities intact.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Arrival & Initial Impact**:
   - The user lands on the Home view. The viewport displays Meraj Hossain's featured projects in a full-bleed horizontal reel.
   - Live Dhaka time (UTC+6) is displayed in the header with a tactile time scrubber dial and real-time lighting ambiance.
2. **Horizontal Friction Scrubbing**:
   - The user scrolls the mouse wheel or clicks and drags anywhere on the canvas. The reel glides with realistic inertia, damping gently to rest.
   - As drag velocity increases, project cards subtly skew along the movement vector ($\pm 2^\circ$ to $\pm 4^\circ$) and project imagery shifts in subtle counter-parallax.
3. **Editorial Navigation Deck**:
   - Clicking **"Index"** triggers the magazine menu. Rather than a standard pop-over, the entire home view scales smoothly down into the first slot of a 3-card magazine deck (`Cases`, `Archive`, `About`).
   - Cards 2 and 3 slide in with perspective depth. The background settles on Brandon Yasin's signature deep olive-green tone (`#353B2D`).
   - Selecting any deck card seamlessly transitions into that view.
4. **Scroll-Linked Case Study Inspection**:
   - Opening a case study engages Lenis smooth scrolling. The project hero image transitions cleanly, the project meta data (client, date, deliverables) pins elegantly, and motion assets lazy-load with high frame rates.
5. **Archive & Quick Reel Preview**:
   - In the Archive, motion design reels and commercial clips are presented with dynamic hover previews that follow the cursor on desktop.

### Visual Identity & Theme Tokens

- **Dominant Neutral Field**: `#101114` (Deep obsidian dark mode default) shifting dynamically via `timeColor.ts` (morning `#1E2421`, golden dusk `#1D1714`, night `#0D0E11`).
- **Fixed Menu Canvas**: `#353B2D` (Brandon Yasin signature dark olive green during menu expansion).
- **Primary Accent**: `#18C98A` (Meraj Hossain neon mint signature).
- **Typography**: `Plus Jakarta Sans` for clean, modern legibility; `Syne` for bold architectural headings; `JetBrains Mono` for metadata and time dial numbers.
- **Zero-Pill Discipline**: All dates, client names, and categories rendered with clean typographic bullet separators (`·`) without boxed capsules.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid Motion Architecture (Framer Motion + GSAP/Lenis)
- *Chosen Approach*: Use Framer Motion for component layout animations, interactive gestures, and menu morphing; use Lenis + GSAP for vertical scroll acceleration and pinned editorial sections.
- *Why*: Framer Motion's shared layout engine (`layoutId`, `useTransform`) provides butter-smooth multi-card deck transitions, while Lenis provides consistent inertia across differing hardware trackpads and mice.
- *Alternatives Considered*: Pure GSAP requires manual DOM recalculations for complex responsive layouts; pure CSS lacks velocity-reactive inertia and gesture physics.

### Decision 2: Friction-Loop vs. Native CSS Scroll-Snap for Horizontal Reel
- *Chosen Approach*: Custom requestAnimationFrame friction loop with pointer event dragging and wheel delta accumulation.
- *Why*: Native CSS scroll snap cannot apply dynamic velocity-dependent skew, elastic edge bounce, or smooth custom cursor trailing.
- *Accessibility*: Disabled for `prefers-reduced-motion` or provided with keyboard arrow navigation keys and touch swipe gestures.

---

## 4. Technical Architecture & Component Hierarchy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App.tsx                                   │
│  State: viewMode ('home'|'case-detail'|'archive'|'about'), menuOpen,   │
│         currentHour (diurnal engine), selectedCase                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          ▼                         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│    Header.tsx    │      │ GalleryHome.tsx  │      │EditorialDeckCards│
│ - Dhaka Live Clock│     │ - Friction Reel  │      │ - 3-Card Deck    │
│ - Time Travel Dial│     │ - Drag Gestures  │      │ - Perspective Fan│
│ - Menu/Contact CTA│     │ - Parallax/Skew  │      │ - View Dispatcher│
└──────────────────┘      └─────────┬────────┘      └──────────────────┘
                                    │ (Case Click)
                                    ▼
                          ┌──────────────────┐
                          │ CaseStudyView.tsx│
                          │ - Lenis Smooth   │
                          │ - Pinned Sidebar │
                          │ - Parallax Media │
                          └──────────────────┘
```

### Interactive Component & State Mapping

1. **`src/components/GalleryHome.tsx`**:
   - Integrates pointer events (`onPointerDown`, `onPointerMove`, `onPointerUp`) and non-passive wheel events.
   - Calculates velocity = $\Delta x / \Delta t$ to derive `skewX = clamp(-5, velocity * 0.15, 5)`.
   - Normalizes bounds with soft cubic spring resistance at the boundaries.
2. **`src/components/EditorialDeckCards.tsx` & `src/App.tsx`**:
   - Maintains continuous geometry coordinates (`cardWidth`, `cardHeight`, `cardTop`, `cardLeft`).
   - Uses `useTransform(menuProgress, ...)` so that closing/opening the menu morphs without unmounting or jarring jumps.
3. **`src/hooks/useLenis.ts`**:
   - Attaches Lenis smooth scroll instance strictly when `view !== 'home' && !isMenuOpen`.
   - Automatically pauses Lenis when modals are open or horizontal dragging is engaged.
4. **`src/components/ContactModal.tsx` & `src/components/ArchiveView.tsx`**:
   - Refines paper-textured transitions, tactile inputs, and floating cursor preview hover cards.
