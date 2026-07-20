Note: I'll build a site *inspired by* dg-cinema.com's aesthetic and structure — not a pixel copy (their brand assets, exact copy, and logo stay theirs). The result will be original text, layout, and imagery in the same design language.

## Design language
- Deep black background (#0A0A0A) with subtle film-grain noise and faint red vertical light-leak columns on the far left/right edges.
- Framing corner brackets (top-left / top-right / bottom-left / bottom-right) around the viewport — the "camera viewfinder" motif.
- Massive uppercase display type (metallic silver → white gradient) as the hero mark.
- Monospaced micro-labels (timecode, EN/UA locale, coordinates) at the corners.
- Accent color: a single cinematic red (#E63946-ish) used sparingly.
- Typography: a bold condensed/wide sans for display (e.g. Anton or Bebas-style) + a mono for HUD labels (JetBrains Mono) + Inter for body.

## Sections (single scrolling page, then dedicated routes for depth)
1. **Hero** — viewfinder frame, animated timecode (live HH:MM:SS), "STUDIO NAME" oversized display, a horizontal marquee of 6–8 cinematic thumbnail cards drifting slowly with a red vignette on the outer tiles, tagline underneath, countdown ticker `3..2..1..0..1..2..3`.
2. **About** — split layout, large statement + supporting paragraph, red accent divider.
3. **Projects** — grid/marquee of case-study tiles with hover reveal (title, year, category, play icon).
4. **Team** — portrait grid, name + role, monochrome → color on hover.
5. **Services** — numbered list (01–06): Film Production, Commercials, Music Videos, Post-Production, Color Grading, Sound Design.
6. **Contact / Get in touch** — huge "LET'S MAKE SOMETHING" statement, email, socials, minimal form.
7. **Footer** — locale toggle (EN / UA), timecode, coordinates.

## Routes
- `/` — hero + all sections stitched together (matches the reference's single-page flow).
- `/projects` — full project index.
- `/about`, `/services`, `/contact` — dedicated pages, each with its own `head()` meta.

## Technical
- TanStack Start file-based routes under `src/routes/`.
- Update `src/styles.css` tokens: `--background`, `--foreground`, `--accent` (red), plus custom `--color-grain`, `--color-frame`.
- Load display + mono fonts via `<link>` in `__root.tsx` head.
- Reusable components in `src/components/`: `ViewfinderFrame`, `Marquee`, `Timecode`, `SectionLabel`, `ProjectCard`, `NavBar`, `Footer`.
- Animations with `framer-motion` (already an option): marquee auto-scroll, hero text mask reveal, image-tile parallax on scroll, hover scale on cards.
- Images: generate ~8 original cinematic stills (studio lighting, camera rigs, dancers in red light, silhouettes) via image generation, saved under `src/assets/`.
- Set real `<title>` / `description` / og tags on each route.

## Out of scope for v1
Custom cursor, video playback in tiles, CMS-backed project pages, i18n switching beyond a visual toggle.

Confirm and I'll build it.