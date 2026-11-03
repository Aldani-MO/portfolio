# Mohamed Aldani: Software Engineer

Bilingual EN/AR developer portfolio inspired by a transit timetable. Next.js 16, React 19, TypeScript, Tailwind CSS, next-intl and GSAP. Arabic uses locally hosted IBM Plex Sans Arabic; Latin uses Bricolage Grotesque and Martian Mono.

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

Edit matching keys in messages/en.json and messages/ar.json. PortfolioPage.tsx supplies section structure and project links. To add a project, add matching locale data, a project article and its index link. This project currently uses locale JSON rather than MDX. Do not add unverified project claims.

Personal details and certificates live in src/content/profile.ts as typed bilingual data. Personal details come from Mohamed's explicit public-display instructions. No birth date was inferred from an earlier age. Add a certificate's bilingual name and issuer, optional ISO date, and HTTPS credential link to the certificates array. Until supplied, the section shows a plain empty-state note rather than invented credentials.

DESIGN.md documents the visual rules. CSS tokens and responsive rules live in src/app/globals.css. Fonts and their licenses live in public/fonts; src/app/fonts.css declares the subsets. Replace public/cv.pdf with the current approved CV.

## Environment variables

- NEXT_PUBLIC_SITE_URL: canonical production origin, with https:// and no trailing slash. Otherwise Vercel's production URL is used, then localhost for development.
- RESEND_API_KEY: optional email provider key, server only.
- CONTACT_FROM_EMAIL: optional sender address verified by Resend, server only.

Without both email variables, visitors get a direct email link. With them, the contact form is enabled, validates input and honeypot, blocks repeat taps, and checks provider acceptance. Never commit secrets or .env files.

## Deployment

Import Aldani-MO/portfolio in Vercel. Framework: Next.js; root directory: repository root (this app directory is the repository). Build: pnpm build. Add the variables above as needed. The GitHub connection enables future deployments on main. A custom domain is optional: add it in Vercel, apply the supplied DNS records, then set NEXT_PUBLIC_SITE_URL and redeploy.

Share the public production URL on LinkedIn. A generated PNG social preview is exposed at /opengraph-image. The sitemap, canonical and language alternates use the configured production origin. Do not advertise an unconfigured custom domain.

## Remaining content

The public bus and phishing repositories were checked on 2026-11-03. The pharmacy repository was not publicly listed. No user counts, performance scores, graduation status or employment availability are invented. Replace or supplement demos with approved screenshots of real projects when available. See SLOP_AUDIT.md for verification and limits.
