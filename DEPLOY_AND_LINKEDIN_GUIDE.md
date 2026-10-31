# Mohamed Aldani — Portfolio Deployment & LinkedIn Guide

## 1. Project Overview & Architecture
Your developer portfolio is designed as an interactive **Transit Route System** ("The Line") inspired by modern European transit signage, departure boards, and dot-matrix displays. It stands out from generic SaaS templates:

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript Strict
- **Styling**: Tailwind CSS v4 (@theme CSS-first tokens) with dedicated transit palette
- **Typography**: Bricolage Grotesque (Latin display), Martian Mono (data/code), Readex Pro (Arabic display & body)
- **Bilingual & RTL**: Full English (`/en`) & Arabic (`/ar`) with next-intl and true RTL mirror layouts
- **Interactive Demos**:
  1. **SDBS Edge-AI Simulator**: Interactive canvas simulating YOLOv8n object detection bounding boxes, confidence gate slider, passenger occupancy controls, and the exact decision engine rules (STOP, SKIP, EARLY DEPART).
  2. **Phish-Checker Live**: In-browser TypeScript port of your Python CLI scoring heuristic (9 rules tested with Vitest).
- **Navigation & Shortcuts**:
  - Live dot-matrix HUD tracking current station and route decisions
  - Command palette triggered via **`⌘K` / `Ctrl+K`** or HUD button (jump to any station, switch language, copy email, download CV)
  - Accessibility first: `prefers-reduced-motion` guards, semantic landmarks, WCAG AA compliance.

---

## 2. How to Run Locally

Inside the project directory:
```bash
cd c:\Users\moham\Desktop\Portfolio\app

# Install dependencies (already completed)
pnpm install

# Run the development server
pnpm run dev

# Open in browser:
# http://localhost:3000 -> automatically redirects to /en or /ar

# Run unit tests:
pnpm vitest run

# Production build test:
pnpm run build
```

---

## 3. How to Deploy to Vercel (1-Click Instant Deployment)

Your code is **already initialized and pushed to GitHub**:
👉 **Repository:** [https://github.com/Aldani-MO/portfolio](https://github.com/Aldani-MO/portfolio)

### Deploy in 30 Seconds:
1. **Click this direct 1-Click Deploy Link:**  
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAldani-MO%2Fportfolio)  
   👉 **URL:** [Deploy Aldani-MO/portfolio on Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAldani-MO%2Fportfolio)

2. Sign in with your GitHub account (`Aldani-MO`).
3. Click **Create** or **Deploy**.
4. (Optional) Set up Contact Form email delivery under Environment Variables:
   - `RESEND_API_KEY`: free key from [resend.com](https://resend.com)
   - `CONTACT_EMAIL`: `Mohammedaldani03@gmail.com`
5. That's it! Vercel will build the Next.js project and give you a fast, production SSL URL (e.g. `https://portfolio-aldani.vercel.app` or your custom domain).

---

## 4. How to Put It on LinkedIn & Stand Out

### A. Headline Formula for Mohamed Aldani
Use one of these high-impact headlines on your LinkedIn profile:

> **Option 1 (Direct & High Value):**  
> Full-Stack Developer | B.S. CS @ PSUT | Transit Systems (Flutter, YOLOv8 Edge-AI) & Security Tools | React, Node.js, Python

> **Option 2 (Builder-Focused):**  
> Software Engineer | Building Edge-AI Transit Management (SDBS) & Web Applications | Flutter · Python · TypeScript · Cloud

---

### B. Add to LinkedIn "Featured" Section
1. Go to your LinkedIn profile.
2. Click **"Add profile section"** -> **"Recommended"** -> **"Add Featured"**.
3. Choose **"Add a link"** or **"Add media"**:
   - **URL**: `https://your-portfolio-domain.com` (or your Vercel URL)
   - **Title**: *Interactive Developer Portfolio — Transit Systems & Edge-AI*
   - **Description**: *A bilingual (EN/AR) transit-route portfolio featuring live browser simulations of my Smart Dynamic Bus System (SDBS) edge-AI decision engine and Phish-Checker heuristic security analyzer.*

---

### C. Launch Post Template (Copy & Paste)
Post this when your site is live to maximize recruiter and engineer engagement:

```text
Excited to share my new developer portfolio: [YOUR_PORTFOLIO_URL]

Instead of building another generic template, I designed it as an interactive transit route ("The Line"), directly reflecting my flagship work on the Smart Dynamic Bus System (SDBS).

Key features built into the site itself:
1. 🚌 Live Edge-AI Simulation: In-browser canvas simulation of the YOLOv8-based passenger counting and route decision engine (STOP, SKIP, EARLY DEPART) from my transit research.
2. 🛡️ Interactive Phish Checker: Browser port of my Python security tool analyzing URLs across 9 heuristic detection vectors.
3. 🌐 Full Bilingual Architecture: Real English and Arabic support with true RTL layout and typography (Readex Pro + Bricolage Grotesque).
4. ⚡ Modern Stack: Next.js 16 (App Router), TypeScript, Tailwind v4, GSAP, and a dot-matrix HUD with ⌘K keyboard navigation.

Built with performance, accessibility, and real engineering proof in mind.

Take it for a spin and let me know your thoughts!

#WebDevelopment #FullStack #SoftwareEngineering #Nextjs #TypeScript #Flutter #EdgeAI #OpenSource #Kuwait #Jordan
```

---

### D. Updating Experience & Projects on LinkedIn

- **Smart Dynamic Bus System (SDBS)**:
  - Add as a Project linked to `github.com/Aldani-MO/smart-dynamic-bus-system`.
  - Highlight: *Built with Flutter, Firebase, and Raspberry Pi running YOLOv8n object detection with an offline SQLite sync queue to dynamically optimize municipal bus routes.*
- **Phish-Checker**:
  - Add as a Project linked to `github.com/Aldani-MO/phish-Checker`.
  - Highlight: *Heuristic URL risk analyzer CLI scoring 9 phishing vectors, dockerized for automated deployment.*
