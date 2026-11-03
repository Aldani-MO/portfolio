# Portfolio design and usability audit

Reviewed 2026-11-03 against the supplied brief and continuation requests.

## Design decisions

- Kept the transit concept, working demos, bilingual content and strong typography.
- Replaced the oversized empty hero with a nameplate and linked work index.
- Removed headline badges, gradient/grain decoration, emoji controls, scroll fades and hidden-content reveals.
- Used open project columns, timetable experience and grouped skill rows. No three-card feature row, glass panels, coloured border cards or default component kit.
- Reduced section padding, raised label sizes and improved dark secondary text and signal colours.
- Rewrote inflated English phrasing and unnatural Arabic technical copy. No invented metrics or additional personal claims.
- Bundled WOFF2 fonts with licenses and caching. Arabic uses IBM Plex Sans Arabic across labels, navigation and headings, with natural line height and no tracking.

## Functional corrections

- Mobile menu replaces crowded navigation; links are genuine section anchors.
- Found and fixed horizontal RTL overflow caused by an offscreen honeypot field.
- Native command dialog manages modal focus and Escape, exposes search results, and explains empty searches.
- Theme follows system preference initially and persists across reload and language changes. The toolbar observes changes made from the command menu.
- Passenger simulation redraws on visitor input; no background frame loop, random timer or state updates on every animation frame. Text results are available with reduced motion.
- URL analysis has working sample inputs and an explained initial state. It never fetches the supplied URL.
- Contact validation, repeat-submit guard and exception handling are present. Missing email configuration and provider-returned errors cannot report delivery success. The public UI uses direct email when the provider is unconfigured.
- Route status sits in page flow and cannot cover content. Skip link is visible on keyboard focus. Deprecated Next.js middleware naming migrated to proxy.
- Added a PNG social sharing image, restored humans.txt and centralized production URL metadata.

## Evidence

- Production Next.js build passes, including TypeScript checking.
- 32 Vitest tests cover phishing rules and malformed input, transit decision priority and contact failure handling.
- 86 Playwright checks passed in Chromium and WebKit with the contact-test server enabled. They cover EN/AR at 375, 768 and 1440px in light/dark themes, plus 320/360/428/820/1024/1280/1920px at normal and 200% text size; real demo decisions, command search, mobile navigation and runtime page errors.
- Localized sharing metadata explicitly includes the PNG preview image; localized titles no longer repeat the name through the parent title template.
- Automated axe WCAG A/AA audits cover EN/AR, light/dark, mobile/desktop. The light-theme signal green was darkened after detecting a 4.03:1 failure against the demo surface.
- Fixed tablet experience-table overflow at 200% text, malformed URLs returning a low-risk label, brand-prefix false negatives, IPv6 handling, and incorrect credential detection for @ in a URL path.
- Tested system theme changes, storage denial and cross-tab theme synchronization. Fixed preferences missed between first paint and listener setup; returning to a tab also resynchronizes the preference.
- Enabled-form browser cases run against a separate local server with dummy email configuration and intercepted delivery. They verify validation, repeated synchronous submits, friendly network failures, and retained drafts without sending email.
- Additional browser checks cover no-JavaScript reading, CV/credits availability, and theme persistence across reload and language navigation.
- Reduced motion is enabled throughout the locale/size/theme browser matrix.
- Screenshots of every section across that matrix are generated under ignored artifacts/. Desktop hero, dark projects and Arabic desktop/mobile layouts were visually inspected.
- Public repository list and project READMEs were verified using GitHub's API. The pharmacy project is retained from the supplied brief without a fabricated public repository link.

## Limits and follow-up

- No Lighthouse score or LCP number is claimed; a Lighthouse performance audit has not been run.
- Browser QA uses Chromium and WebKit. Short viewport checks approximate reduced space around inputs; real iOS/Android keyboards and assistive technology have not been manually tested. Automated WCAG checks do not replace a manual accessibility audit.
- No live email was sent. Add RESEND_API_KEY and CONTACT_FROM_EMAIL with a verified sender to enable the contact form; direct email works without them.
- Custom domain ownership/DNS was not established. Use the verified Vercel production URL.
- Production deployment: https://mohamed-aldani-portfolio.vercel.app. Anonymous English access returned HTTP 200 with the correct production canonical URL.
- Certificates are awaiting user-supplied names, issuers, dates and credential links. A plain empty state is shown. No birth date was inferred from age. Personal details were supplied explicitly for public display in this conversation.
- Obtain a public pharmacy repository or approved screenshots if desired. Current copy avoids asserting graduate status.
