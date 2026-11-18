# The Line: Mohamed Aldani's portfolio

A developer portfolio laid out like a transit line. Each section is a stop on one continuous route, and the projects carry real screenshots and working browser demos.

## Direction

Wayfinding, not novelty. One teal route line runs down the inline-start edge on wide screens; every section is a stop with a numbered plate beside its heading. An amber marker rides the line as you scroll (pure CSS `position: sticky`, no script). The hero pairs a large nameplate with a dark "departure board" that shows the flagship's real driver screen and the three selected projects. Everything else is open columns separated by rules: no card grids, no icon tiles.

## Tokens

`src/app/globals.css` is the source of truth.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | #f3efe6 | #0e1315 | Page ground (paper / ink) |
| `--raised` | #fbf9f4 | #151c1f | Demo panels, palette |
| `--ink` | #13191b | #ece7dc | Text, outlines |
| `--ink-2` | #4a5456 | #a3aeac | Secondary text (AA on bg and raised) |
| `--rule` | #d3cbbb | #273235 | Dividers |
| `--line` | #0b5c55 | #5cc2b3 | Route line, stop plates, primary action |
| `--accent` | #9a5600 | #f0a63a | Only "you are here": route marker, focus ring, leave-early signal |
| `--go` / `--skip` | #1b6b3a / #b3261e | #6fd39b / #ff8a7a | Decision and risk signals |
| `--board*` | dark panel in both themes | | Hero departure board |

Theme follows the OS until the visitor chooses; the choice persists across reloads, tabs and languages. Without JavaScript, `prefers-color-scheme` still applies.

## Type

- Bricolage Grotesque (variable 200 to 800): display and body.
- Martian Mono: data only (dates, stack lists, line numbers, scores, key hints).
- IBM Plex Sans Arabic: all Arabic text, including its own Latin glyphs for mixed technical terms. No uppercase or tracking in Arabic; line height 1.85.
- Fluid scale from `--fs-xs` (13px) to `--fs-hero` (capped at 6rem and 16.5vw so the nameplate never overflows at 200% text).

## Layout and spacing

72px route column above 900px; below that the route hides and stop plates carry orientation. Gutter `clamp(20px, 4vw, 56px)`. Section padding `clamp(64px, 8vw, 112px)`. Flagship case study uses a 12-column grid on desktop, one column below 1100px. Phone screenshots become a horizontal snap-scroller under 768px. Controls are at least 44px tall; inputs are 16px to avoid zoom on iOS.

## Motion

Every animation has a reduced-motion fallback.

- Hero: name and content rise in once; the board slides in. A faint transit map sits behind the hero with small trains running its lines (SVG animateMotion, hidden for reduced motion).
- Portrait pass: split-flap name strip, hover zoom and a light sweep; Kuwait clock digits flip each minute.
- Theme switch: the new theme grows as a circle from the toggle (View Transitions API), the sun/moon icon turns in. Falls back to an instant switch.
- Hover: buttons fill with a sweep and their arrows nudge; nav links grow an underline; board rows tilt their line plate; screenshots and certificates lift; table rows tint; stop plates turn.
- Route column: the sticky amber marker trails a teal travelled line; stop markers fill as you reach them where scroll-driven animations are supported.
- Demos: the decision badge pops when it changes; the detection canvas sweeps each new frame; the URL checker splits the link into labelled parts with a scan, and the score counts up.

## Content rules

Every claim is in `src/content/portfolio.ts` and traceable to a repository, the CV, a credential page, or the owner. The occupancy demo is labelled as a browser simulation; the real YOLOv8n model runs in Python on a Raspberry Pi. The URL checker never fetches the URL and says a low score is not a guarantee. Certificates show the issuer's exact title, issue and expiry dates from the certificate, and link to the issuer's verification page.

## Not used

Purple/blue gradients, gradient text, glass, glow, grain, emoji or glyph icons (icons are two authored SVG strokes), eyebrow labels above headings, three-card feature rows, hero metrics, invented numbers, buzzword copy.
