# Mohamed Aldani: Full-Stack Developer portfolio

Bilingual EN/AR developer portfolio laid out as a transit line. Next.js 16, React 19, TypeScript, Tailwind CSS v4 and next-intl. The page is server-rendered; only the navigation, command palette and the two demos ship client JavaScript. Arabic uses locally hosted IBM Plex Sans Arabic; Latin uses Bricolage Grotesque and Martian Mono.

## Local development

Install Node.js 20.9+ and the pnpm version declared in package.json.

```sh
pnpm install
pnpm dev
pnpm test
pnpm build
pnpm start
# Against a running production server on port 3000:
pnpm exec playwright install chromium webkit
pnpm test:e2e
```

The tests cover URL scoring and invalid input, transit decision priorities, contact failure handling, EN/AR from 320 to 1920px, 200% text, both themes, reduced motion, no-JavaScript content, command search, mobile navigation and persisted themes. Automated WCAG A/AA checks run in Chromium and WebKit. Browser screenshots are saved under ignored artifacts/.

To exercise the enabled contact form, start a second local server on port 3001 with dummy RESEND_API_KEY and CONTACT_FROM_EMAIL values, then run the suite with CONTACT_TEST_URL=http://localhost:3001. Those tests intercept and abort delivery requests, verify validation and duplicate-submit prevention, and check that the draft survives network errors. No real email is sent. Without CONTACT_TEST_URL the enabled-form cases are skipped.

## Edit content

All page copy lives in `src/content/portfolio.ts` as typed `{ en, ar }` pairs: hero, projects, experience, skills, education, certificates and contact. `messages/*.json` only holds strings used by client components (navigation, command palette, URL checker, contact form). `PortfolioPage.tsx` renders the sections.

- Projects: screenshots live in `public/work/`. Only use real screenshots from the project.
- Certificates: add an entry to `credentials` with the exact title, issuer, ISO issue date (and expiry if printed), a one-line context and the issuer's verification URL. Certificate thumbnails in `public/credentials/` are rendered from the issuer PDFs. Do not publish a certificate image that shows an ID number.
- CV: edit `public/resume.html`, then regenerate `public/cv.pdf` with Chromium print (A4, no header or footer) so no local file path is printed.

`DESIGN.md` documents tokens, type, layout and motion rules.

## Environment variables

- NEXT_PUBLIC_SITE_URL: canonical production origin, with https:// and no trailing slash. Otherwise Vercel's production URL is used, then localhost for development.
- RESEND_API_KEY: optional email provider key, server only.
- CONTACT_FROM_EMAIL: optional sender address verified by Resend, server only.

Without both email variables, visitors get a direct email link. With them, the contact form is enabled, validates input and honeypot, blocks repeat taps, and checks provider acceptance. Never commit secrets or .env files.

## Deployment

Import Aldani-MO/portfolio in Vercel. Framework: Next.js; root directory: repository root (this app directory is the repository). Build: pnpm build. Add the variables above as needed. The GitHub connection enables future deployments on main. A custom domain is optional: add it in Vercel, apply the supplied DNS records, then set NEXT_PUBLIC_SITE_URL and redeploy.

Share the public production URL on LinkedIn. A generated PNG social preview is exposed at /opengraph-image. The sitemap, canonical and language alternates use the configured production origin. Do not advertise an unconfigured custom domain.

## Remaining content

The public bus and phishing repositories were checked on 2026-11-03; certificate links were checked on 2026-11-18. The pharmacy repository was not publicly listed. No user counts, performance scores, graduation status or employment availability are invented. Replace or supplement demos with approved screenshots of real projects when available. See SLOP_AUDIT.md for verification and limits.
