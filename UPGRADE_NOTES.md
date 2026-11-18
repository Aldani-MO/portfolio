# Upgrade notes, 2026-11-18

## Changed

- Rebuilt the visual system around the existing transit idea: paper/ink grounds, one teal route line, a single amber "you are here" marker that rides the line with CSS `position: sticky` (GSAP removed). See DESIGN.md.
- Hero now says who and what in one screen: name, "Junior full-stack developer", a one-sentence proof (DigiTecHouse internship, team-built SDBS graded A+), CV download, email, and four facts. A dark departure board shows the real SDBS driver screen and links to the three projects.
- Flagship case study for the Smart Dynamic Bus System: problem, context (PSUT graduation project, team of three, A+), real app screenshots, how the edge module, Firestore and the app connect, the five decision rules in order, and the simulation.
- Corrected the simulation: the camera now sets on-board occupancy and a slider sets QR check-ins at the stop, matching `decision_service.dart` and `edge-module/uploader.py`. Previously detections were fed in as the waiting count.
- Certificates section is real: five credentials with exact titles, issuers, issue/expiry dates from the certificates, and issuer verification links. Google certificate thumbnails are rendered from the issuer PDFs. The IBM certificate image is not published because it prints a student ID number.
- Removed nationality and residence-permit type from the public page at the owner's request; shows "Kuwait, with valid residency" instead. Removed the scroll-speed HUD and the mobile progress bar.
- Page is now a server component; only Nav, command palette, demos and contact form are client code. Removed unused dependencies (gsap, @gsap/react, framer-motion, lenis, react-hook-form, @hookform/resolvers, @testing-library/react, @vitest/ui). Next.js 16.4.3 to 16.4.6 (security patch flagged by the Next.js CLI).
- CV regenerated from `public/resume.html` without the browser header/footer that printed a local `file:///C:/Users/...` path; wording aligned with verifiable facts; certificates added.
- Fixed pre-existing React compiler lint errors in the command palette.

## Verified

- `pnpm lint`, `tsc --noEmit`, `pnpm test` (32 unit tests), `pnpm build` pass.
- Playwright (Chromium and WebKit) against the production build: 82 passed, 4 skipped (enabled-contact-form cases need `CONTACT_TEST_URL`). Covers EN/AR at 320 to 1920px, 200% text, both themes, reduced motion, axe WCAG 2.2 AA, no-JS content, command palette, mobile menu, theme persistence and both demos.

## Second pass (same day)

- Portrait in the nav and beside the name (`public/portrait.jpg`, cropped from the owner's photo).
- Split-flap board text, Kuwait clock, scroll-filled route line, URL anatomy scanner, detection scan sweep.
- Third pass: the hero simulation was removed at the owner's request; the board now shows the portrait as a transit pass. Added circular theme-switch reveal, hover animations, hero entrance and animated background map.
- New "Recent departures on GitHub" section from the GitHub API (revalidated every 6 hours; hidden if the API fails).
- IBM certificate image published unedited at the owner's request (it shows the student ID).
- LinkedIn updated to linkedin.com/in/mohamed-aldani-5b18992a1 on the site, CV and structured data.
- Tests: 36 unit tests, 84 Playwright checks passing.

## Open items for the owner

- Name spelling differs across documents: site/CV "Mohamed Aldani", Google certificates "Mohamad Aldani", Accredible badge page "Mohammed Al-Dani", IBM certificate "Mohamad Mulham Aldani". Nothing was changed; decide which to use on LinkedIn and future credentials.
- Royal Pharmacy title: the old CV said "IT Support Specialist", the old site "IT Assistant"; the site and CV now use "IT Assistant Intern" per the owner's brief. Confirm.
- SDBS: your personal part within the team of three is not stated anywhere. Adding one sentence (for example, which modules you built) would strengthen the case study. A+ is stated from the owner's brief.
- Pharmacy Management System has no public repository or screenshots.
- The ATHIR Shopify demo was not added: no source or proof was in this repository.
- The contact form stays in direct-email mode until `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` are configured.
