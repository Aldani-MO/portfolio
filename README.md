# Mohamed Aldani — Transit Route Portfolio ("The Line")

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_@theme-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-9_passed-6E9F18?logo=vitest)](https://vitest.dev/)
[![Bilingual](https://img.shields.io/badge/i18n-EN_%2F_AR_(RTL)-amber)](https://next-intl.dev/)

> **A personal developer portfolio conceived as a vertical transit route where every section is a station and the page itself is the proof.**

Scroll drives a dynamic bus marker along the route line, but structure, typography, and atmosphere do the real work. Inspired by European transit signage, departure timetables, and dot-matrix station displays.

---

## 🚌 Live Engineering Demonstrations Built-In

Rather than listing skills as passive bullet points, the site embeds interactive simulations of real projects:

### 1. Smart Dynamic Bus System (SDBS) — Edge-AI Simulation
- **Origin**: Flagship transit management platform ([github.com/Aldani-MO/smart-dynamic-bus-system](https://github.com/Aldani-MO/smart-dynamic-bus-system)) built with Flutter, Firebase Firestore, and an onboard Raspberry Pi running YOLOv8n + OpenCV with an offline SQLite transaction queue.
- **In-Browser Demo**: An HTML5 Canvas rendering bounding boxes with fluctuating detection confidence, adjustable confidence gates, passenger occupancy sliders, and autonomous stop decisions:
  - `0 passengers waiting` → **SKIP**
  - `Bus at capacity (occupancy >= 50)` → **SKIP**
  - `Waiting > available capacity` → **STOP**
  - `Waiting >= threshold AND seats available` → **EARLY-DEPART**

### 2. Phish-Checker — Heuristic Threat Engine
- **Origin**: Heuristic URL risk analyzer CLI ([github.com/Aldani-MO/phish-Checker](https://github.com/Aldani-MO/phish-Checker)) built with Python and containerized with Docker.
- **In-Browser Demo**: A pure TypeScript port executing client-side analysis across 9 distinct phishing detection vectors (homoglyphs, URL shorteners, bare IP hostnames, excessive subdomains, brand impersonation, suspicious TLDs, and redirection queries).
- **Test Suite**: 9/9 automated unit tests verifying edge cases with Vitest.

---

## 🌐 Bilingual Architecture (EN / AR) & True RTL

- Seamless English (`/en`) and Arabic (`/ar`) localization powered by `next-intl`.
- **True RTL Layout**: Complete geometric mirroring for Arabic:
  - Route line and bus marker transition to the leading right-hand margin.
  - CSS logical properties (`margin-inline`, `padding-inline`, `border-inline`) ensure no broken layouts.
  - Arabic typography curated with Google Fonts **Readex Pro**, harmonized with Latin headings in **Bricolage Grotesque** and data displays in **Martian Mono**.

---

## ⚡ Technical Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript (Strict) |
| **Styling** | Tailwind CSS v4 (`@theme inline`), CSS Custom Properties |
| **Motion** | GSAP 3, ScrollTrigger, MotionPathPlugin (`prefers-reduced-motion` guarded) |
| **Localization** | `next-intl` (server & client providers, hreflang alternates) |
| **Command Menu** | Custom accessible Command Palette (`⌘K` / `Ctrl+K`) |
| **Testing** | Vitest for heuristic rule validation |
| **SEO & Schema** | OpenGraph, Twitter Cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- `pnpm` (recommended) or `npm`

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/Aldani-MO/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev
# -> Listening on http://localhost:3000

# Run automated test suite
pnpm vitest run

# Production build
pnpm run build
```

---

## 📄 License & Attribution

Designed and developed by **Mohamed Aldani (محمد الضاني)**.  
Open-source under the MIT License.
