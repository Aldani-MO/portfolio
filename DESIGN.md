# DESIGN.md — Mohamed Aldani Portfolio
## The Single Source of Truth

---

## Concept (one sentence)

> A transit route portfolio where every section is a station and the page itself is the proof — scroll drives a bus along the line, but structure, type, and atmosphere do the real design work.

---

## The Line Concept

The whole site IS a transit route. Sections are **stations**:

| Station ID | Name | Role |
|---|---|---|
| DEPOT | Hero / Landing | Terminal origin |
| STOP 01 | About | Passenger info |
| STOP 02 | Projects | Main stops |
| STOP 03 | Experience | Schedule / timetable |
| STOP 04 | Skills | Route map |
| TERMINUS | Contact | Final destination |

A small **bus marker** travels down a vertical SVG route line, driven by GSAP ScrollTrigger + MotionPath. A fixed **HUD** (dot-matrix display) in the corner shows current station, next stop, and a decision state (STOP / SKIP / EARLY-DEPART) that reacts to scroll velocity.

Visual language: **transit signage + printed timetable + dot-matrix display**. Think London Underground line diagrams, Deutsche Bahn departure boards, printed bus schedules. NOT a SaaS landing page.

---

## Palette

All tokens defined as CSS custom properties in `@theme` (Tailwind v4 CSS-first).

```css
/* Named palette — Transit Signage */

--color-ground:      #1A1C17;   /* GROUND    — Deep signage charcoal-green, like Tube map background */
--color-surface:     #232620;   /* SURFACE   — Elevated surface (cards, panels), slightly lighter */
--color-paper:       #F5F0E8;   /* PAPER     — Warm off-white, printed timetable stock */
--color-ink:         #E8E3D8;   /* INK       — Body text on dark ground */
--color-line-amber:  #F5A623;   /* LINE A    — Amber signal/highlight, route number backgrounds */
--color-line-red:    #C0392B;   /* LINE R    — Alert/danger line (SKIP state, phish high risk) */
--color-line-green:  #27AE60;   /* LINE G    — Clear/safe line (STOP state, phish low risk) */
--color-muted:       #6B6E63;   /* MUTED     — Subdued text, disabled states, hairline rules */
--color-rule:        #2E3029;   /* RULE      — Hairline borders / grid lines */
```

### Colour Roles (strict)

| Token | Use |
|---|---|
| `--color-ground` | Page background, always |
| `--color-surface` | Panels, code blocks, HUD background |
| `--color-paper` | Section dividers printed on ground; the "skip the ride" light view flips this to background |
| `--color-ink` | All body text on dark backgrounds |
| `--color-line-amber` | Route numbers, station IDs, HUD active state, interactive highlights |
| `--color-line-red` | SKIP decision state, high phishing risk, error states |
| `--color-line-green` | STOP decision state, low risk, success states |
| `--color-muted` | Caption text, timestamps, disabled |
| `--color-rule` | All hairline borders — 1px, never thicker |

**BANNED from this palette:** purple, indigo, violet, teal, any gradient between two colours, glassmorphism blur, pastel tones, neon on black.

---

## Type System

### Rationale

**Bricolage Grotesque** — Latin display/headings  
*Why:* It has variable-width axis, extreme weight contrast, and a distinctive optical texture from its staggered alternating widths. It reads immediately as human-crafted, not machine-generated. Reminiscent of Swiss transit poster lettering without being retro.

**Martian Mono** — Monospace / station labels / code / HUD  
*Why:* Technically rigorous mono with a slightly alien edge. Perfect for dot-matrix simulation, code blocks, route numbers, and data displays. Not JetBrains (too common), not Courier.

**Readex Pro** — Arabic body and display text  
*Why:* Specifically designed for Arabic/Latin bilingual use, optical harmony at matching sizes, supports full Arabic script. Renders naturally in RTL context.

```css
/* Font imports (Google Fonts) */
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Martian+Mono:wght@100..800&family=Readex+Pro:wght@160..700&display=swap');

--font-display:  'Bricolage Grotesque', sans-serif;
--font-mono:     'Martian Mono', monospace;
--font-arabic:   'Readex Pro', sans-serif;
```

### Type Scale (Major Third — 1.25 ratio)

```css
--text-xs:    0.64rem;   /* 10.24px — captions, timestamps */
--text-sm:    0.8rem;    /* 12.8px  — labels, muted info */
--text-base:  1rem;      /* 16px    — body */
--text-md:    1.25rem;   /* 20px    — subheadings */
--text-lg:    1.563rem;  /* 25px    — section intros */
--text-xl:    1.953rem;  /* 31.25px — station names */
--text-2xl:   2.441rem;  /* 39px    — project titles */
--text-3xl:   3.052rem;  /* 48.8px  — hero sub */
--text-hero:  clamp(3.5rem, 8vw, 7rem);   /* DEPOT hero name */
```

### Weight Axis

Bricolage Grotesque is variable — use full range:
- `200` — ghost labels, background watermarks
- `400` — body text
- `600` — station labels, nav
- `800` — hero display, project titles

### Typography Rules
- NO italic for critical info (use weight/mono contrast instead)
- Station IDs (STOP 01, STOP 02) always in `--font-mono`, uppercase
- Route numbers always amber on dark, or dark-on-amber
- Body copy max-width: `72ch`
- Heading orphan control: use `text-wrap: balance`

---

## Spacing & Grid

```css
/* 8px base unit */
--space-1:   0.5rem;    /* 8px  */
--space-2:   1rem;      /* 16px */
--space-3:   1.5rem;    /* 24px */
--space-4:   2rem;      /* 32px */
--space-6:   3rem;      /* 48px */
--space-8:   4rem;      /* 64px */
--space-12:  6rem;      /* 96px */
--space-16:  8rem;      /* 128px */
--space-24: 12rem;      /* 192px */
```

### Layout Grid
- **Desktop:** 12-column grid, 24px gutters, 80px outer margins
- **Tablet:** 8-column, 16px gutters
- **Mobile:** 4-column, 16px gutters, 20px outer margins

### Asymmetry Rules
- Hero: name left-aligned, large, bleeds into the route line column
- Project sections alternate left/right layout (no uniform rows)
- Experience section: printed timetable grid — entries as table rows
- Skills: grouped as route-line rows, not icon tiles

---

## Motion Principles

### Philosophy
"One orchestrated sequence, then the page breathes." No random hovers. Motion serves information.

### The Route Animation (GSAP)
```
Page load → bus marker fades in at DEPOT (top of route line)
Scroll → bus travels along MotionPath (the SVG route line)
Bus pauses/bounces subtly as it arrives at each station
HUD updates: station name changes with mono typewriter effect
HUD decision state (STOP/SKIP/EARLY-DEPART) changes based on scroll velocity
```

### Motion Tokens
```css
--ease-transit:  cubic-bezier(0.4, 0, 0.2, 1);  /* Bus travel — smooth acceleration */
--ease-depart:   cubic-bezier(0.0, 0, 0.2, 1);  /* Leaving a stop — fast out */
--ease-arrive:   cubic-bezier(0.4, 0, 1, 1);    /* Arriving — decelerate in */
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 600ms;
--duration-bus:  1200ms;   /* Bus marker travel segments */
```

### Orchestrated Page Load (1 sequence)
1. Route line draws itself (SVG stroke animation, 800ms)
2. Bus marker appears at DEPOT
3. Station dots pulse once
4. Hero text reveals: station ID fades first, then name sweeps in (Bricolage, weight 800)
5. Nav fades in
Total: ~2s, no jank

### Allowed Hover Effects (all subtle)
- Links: underline grows from left (not color jump)
- Project panel: slight upward translate (2–4px, no scale)
- Buttons: border brightens, no bounce
- HUD: glows subtly on hover

### Reduced Motion (`prefers-reduced-motion: reduce`)
- Bus animation: disabled. Bus marker stays fixed at current station.
- SVG route line: static (no draw animation)
- All transitions cut to `0ms` or `instant`
- Content remains fully readable and interactive

---

## Backgrounds — Depth & Atmosphere

**Not flat solid colour.** Two techniques:

1. **Timetable grid** — a very subtle SVG grid pattern (like graph paper printed on charcoal). Opacity ~4%, purely decorative, does not interfere with text. Generated as inline SVG `background-image`.

2. **Hero grain** — optional WebGL shader (via Three.js, lazy-loaded). Produces a very fine organic film-grain texture on the hero section only. Falls back to a CSS noise pattern (SVG turbulence filter) if WebGL is unavailable. Disabled under reduced motion.

```css
/* Grain fallback (CSS) */
--hero-grain: url("data:image/svg+xml,..."); /* SVG feTurbulence noise */
```

---

## The HUD (Dot-Matrix Display)

A small fixed panel, bottom-right on desktop, top-right on mobile.

```
┌────────────────────┐
│ LINE 01            │
│ ── ── ── ── ─●─ ── │  ← route dots
│ NOW:  STOP 02      │
│ NEXT: STOP 03      │
│ STATE: EARLY-DEPART│
└────────────────────┘
```

- Font: `--font-mono`, small
- Colour: amber on charcoal surface
- State changes: typewriter-style character replace (not fade)
- Never obstructs content; collapses to a single dot on very small screens
- "Skip the ride" link lives here

---

## The Route Line (SVG)

- Vertical SVG path, full page height, positioned in a fixed column
- Amber (`--color-line-amber`) stroke, 2px width
- Station dots: 8px circles, amber fill, dark center dot
- The bus marker: a small rectangle (12×20px) that follows the MotionPath
- On desktop: lives in a dedicated column (left sidebar ~80px wide)
- On mobile: collapses to a top horizontal thin bar indicator (no path travel)
- RTL (Arabic): route line mirrors to the right side

---

## Component Vocabulary

| Component | Style rules |
|---|---|
| **Station header** | STOP 01 in mono + route number badge (amber) + station name in Bricolage 800 |
| **Project panel** | Full-width asymmetric layout; tech stack shown as route line tags; NO rounded cards |
| **Timetable row** | Experience entries as `<table>` or CSS grid rows; hairline borders only |
| **Skill group** | Each group is a "line" (coloured left border) with skill chips as stops |
| **Code/terminal** | Dark surface, mono font, amber prompt character |
| **Form fields** | Bare underline inputs (no rounded borders); label floats above |
| **Buttons** | `[BOARD →]` style — square brackets as visual frame, mono uppercase |

---

## Banned List (HARD)

### Fonts
- Inter, Roboto, Arial, system-ui, sans-serif (except Arabic fallback)
- Space Grotesk, Nunito, Poppins, DM Sans
- Any font not explicitly listed in the type system above

### Colours & Effects
- Any purple, indigo, violet, or blue-purple tone
- Gradient text (`background-clip: text`)
- Any multi-colour gradient background
- Glassmorphism (`backdrop-filter: blur`)
- Pastel on white
- Neon on black (not our palette)
- `box-shadow` for elevation (use hairline borders instead)

### Layout Patterns
- Centred hero with two CTAs side by side
- Row of 3 identical rounded cards with icons above text
- Icon tiles (emoji/icon + heading + paragraph in a card)
- Uniform `border-radius: 1rem` everywhere
- Testimonials or fake star ratings
- "Live" pulse badges
- Any invented metric or stat

### Motion
- Bounce hover (no `scale(1.05)` on hover)
- Parallax that traps scroll
- Auto-playing video without user consent
- Looping animations in viewport that the user cannot stop

---

## Accessibility Contract

- All animations respect `prefers-reduced-motion: reduce`
- "Skip the ride" link at the very top: jumps to `#static` view
- Visible focus ring on all interactive elements (`outline: 2px solid var(--color-line-amber)`)
- WCAG AA contrast minimum everywhere (check paper/ink combos)
- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>` with `aria-label`
- Station sections have `id` attributes matching HUD display names
- Language switch announces to screen readers (`aria-live`)
- All images have descriptive `alt` text
- Command palette fully keyboard navigable

---

## RTL (Arabic) Rules

- Use CSS logical properties throughout: `margin-inline-start` not `margin-left`
- Route line mirrors: appears on right side in RTL
- Bus travels right-to-left
- Bricolage Grotesque for Latin, Readex Pro for Arabic — never mix on same line
- Arabic numerals for Arabic locale where appropriate
- `dir="rtl"` on `<html>` tag when locale is AR
- All flex/grid layouts must be verified in RTL; no hardcoded `left`/`right`
