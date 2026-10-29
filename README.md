# Meraj Hossain Portfolio

React portfolio for Meraj Hossain, with editable profile, case study, and archive content.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `ADMIN_EMAIL`, a unique `ADMIN_PASSWORD`, and the Cloudflare R2 values.
3. Start the site and API with `npm run dev`.
4. Open `http://localhost:3000/` or the admin panel at `http://localhost:3000/admin`.

The admin panel has structured editors for the profile, case studies, and archive, including nested lists and media fields. Sign in with the server-only credentials in `.env`; passwords are not included in the browser bundle. The initial portfolio data is seeded from the source files. The first successful save writes `data/portfolio.json`.

In **Case studies**, add sections to a project to build an editable story: choose an alternating image/text layout, full-width visual, sticky-image story, or cinematic gallery. Sections and projects can be reordered, duplicated, and removed; image fields accept URLs or R2 uploads. Set a project to **Draft** to keep it off the public portfolio, then use its **Preview** link while signed in. Published projects have shareable `/projects/<slug>` URLs. Existing entries without a status remain published.

Each project can override the cinematic motion preset and shutter duration (700–1000 ms); the default is 850 ms. The motion respects the visitor's reduced-motion preference. The section editor also exposes image placement, size, spacing, background, captions, alt text, CTA, and sticky/gallery behavior.

Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, and `R2_PUBLIC_BASE_URL` to enable image/video uploads. Create a Cloudflare R2 bucket, generate an S3-compatible token scoped to that bucket, and configure a public domain for the bucket. Supported uploads are JPEG, PNG, WebP, GIF, AVIF, MP4, MOV, and WebM. The maximum file size defaults to 100 MiB and can be changed with `R2_MAX_UPLOAD_BYTES`. Uploaded objects are tracked in `data/media.json`; deleting a library item deletes its R2 object as well.

## Production

Run `npm run build`, then start the Node server with `npm start`. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `PORT` in the server environment. The host must support a persistent writable filesystem for `data/portfolio.json`; ephemeral serverless storage will not preserve admin edits across restarts or deployments.

The portfolio content and media index use local JSON persistence. Use a host with persistent writable storage; ephemeral serverless storage will not preserve admin changes. MongoDB is not currently used by this Vite/Express portfolio app.
