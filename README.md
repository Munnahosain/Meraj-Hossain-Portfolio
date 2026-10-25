# Meraj Hossain Portfolio

React portfolio for Meraj Hossain, with editable profile, case study, and archive content.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD`.
3. Start the site and API with `npm run dev`.
4. Open `http://localhost:3000/` or the admin panel at `http://localhost:3000/admin`.

The admin panel edits the profile, case studies, and archive as JSON. Sign in with the server-only credentials in `.env`; passwords are not included in the browser bundle. The initial portfolio data is seeded from the source files. The first successful save writes `data/portfolio.json`.

## Production

Run `npm run build`, then start the Node server with `npm start`. Configure `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `PORT` in the server environment. The host must support a persistent writable filesystem for `data/portfolio.json`; ephemeral serverless storage will not preserve admin edits across restarts or deployments.

The imported CMS foundation uses local JSON persistence. MongoDB, Google OAuth, cloud media uploads, and the source repository's unfinished CMS routes are not connected to this Vite portfolio.
