# Trupasa Landing Page

Project: Static, multilingual landing page for Trupasa built with Next.js 14 (App Router), TypeScript, Tailwind, and next-intl. It renders three locales (EN, SV, SO) and is configured for GitHub Pages hosting.

## Overview
- Framework: Next.js 14 (App Router) with `output: 'export'` for static export
- Languages: English (`/en/`), Swedish (`/sv/`), Somali (`/so/`) using next-intl
- Styling: Tailwind CSS with simple design tokens in `web/app/globals.css`
- Newsletter: Client-side form
  - Static hosting: posts to Formspree if configured, otherwise falls back to `mailto:`
  - Dynamic (optional): `/api/subscribe` exists for server environments (not used on GitHub Pages)
- Deployment: GitHub Pages via workflow at `.github/workflows/pages.yml`

## Repository Layout
- `web/` – Next.js app root
  - `app/[locale]/` – SSG pages per locale and i18n provider
  - `app/page.tsx` – static redirect to `./en/`
  - `components/` – section components (HowItWorks, Architecture, Partners, Testimonials, etc.)
  - `locales/{en,sv,so}/common.json` – translation files (nested structure)
  - `next.config.mjs` – static export, basePath/assetPrefix, next-intl plugin
  - `next-intl.config.ts` – locale definitions for next-intl
- `.github/workflows/pages.yml` – GitHub Actions for Pages deploy

## Run Locally (dev server)
- `cd web`
- `npm ci`
- `npm run dev`
- Open `http://localhost:3000/en/` (or `/sv/`, `/so/`).

## Local Static Preview
Opening HTML files directly via `file://` breaks CSS links. Serve the `out/` folder via HTTP:
- `cd web`
- `npm run build`  # generates `web/out`
- `npx serve out`
- Open `http://localhost:3000/en/` (and `/sv/`, `/so/`).

## Deploy to GitHub Pages
This repo contains a Pages workflow that builds from `web/` and deploys the static site in `web/out`.

1) Configure Pages
- GitHub → Repository → Settings → Pages → Source: GitHub Actions.

2) Check basePath settings (project pages)
- If the repository name is `trupasa`, `.github/workflows/pages.yml` already sets:
  - `NEXT_BASE_PATH: '/trupasa'`
  - `NEXT_ASSET_PREFIX: '/trupasa/'`
- If your repo name differs, change both to `'/YOUR_REPO'` and `'/YOUR_REPO/'` respectively.

3) Optional: Enable Formspree for the Newsletter
- Create a Formspree form and copy the endpoint, e.g. `https://formspree.io/f/XXXXXXX`.
- Add a repository secret: `FORMSPREE_ENDPOINT` with the endpoint URL.
- In `.github/workflows/pages.yml` under the "Build static site" step `env:`, add this line:
  - `NEXT_PUBLIC_FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}`
- Commit and push. On Pages, the newsletter form will submit to Formspree and show success/error messages.
- If not set, the form falls back to `mailto:info@trupasa.org`.

4) Deploy
- Push to `main` (or `master`). The workflow builds and deploys.
- Your site URLs:
  - `https://<USER>.github.io/<REPO>/en/`
  - `https://<USER>.github.io/<REPO>/sv/`
  - `https://<USER>.github.io/<REPO>/so/`

## Translating Content
- Edit JSON in:
  - `web/locales/en/common.json`
  - `web/locales/sv/common.json`
  - `web/locales/so/common.json`
- Use nested keys (e.g., `nav.how` becomes `{ "nav": { "how": "..." } }`).
- Rebuild: `cd web && npm run build`.

## Changing the Default Locale
- The root redirect lives in `web/app/page.tsx`. Change `./en/` to `./sv/` or `./so/` if you want a different default for the demo.

## Notes & Troubleshooting
- CSS missing when opening files directly: serve `web/out` with a local HTTP server; do not use `file://`.
- Links respect `basePath` at build time. Ensure `NEXT_BASE_PATH`/`NEXT_ASSET_PREFIX` match your repo name in the workflow.
- GitHub Pages is static only. Server routes like `app/api/subscribe` won’t run on Pages; use Formspree or another external service.
- Images use `images.unoptimized` for static export. Place assets in `web/public/` (already includes `trupasa.jpeg`).

## License
- Internal project files. No license header added.
