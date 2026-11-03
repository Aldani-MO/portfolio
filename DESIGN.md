# The Line: Mohamed Aldani's portfolio

A developer portfolio arranged as a transit route, with working examples of the software at each stop.

## Visual direction

Use a printed timetable and transit signage as the reference. The hero is an asymmetric nameplate beside a compact index of real projects. Project stories use open columns and rules rather than a collection of cards. The route marker supplies the single scroll-linked detail. Content is visible from the first render.

## Palette

The CSS variables in src/app/globals.css are the implementation source of truth.

| Role | Light | Dark |
| --- | --- | --- |
| Ground | #F7F4EE | #1A1C17 |
| Surface | #ECE6DA | #232620 |
| Ink | #161813 | #E8E3D8 |
| Route amber | #885100 | #F5A623 |
| Signal red | #B91C1C | #FF9385 |
| Signal green | #15803D | #71CF9A |
| Secondary text | #575A51 | #ADB1A5 |

Amber identifies the route and actions; green and red communicate decisions. Neutral rules separate content. No coloured border card system.

## Typography

- Bricolage Grotesque: Latin display and body, with a large nameplate and restrained negative tracking.
- Martian Mono: compact technical annotations and navigation.
- IBM Plex Sans Arabic: Arabic headings, body, navigation, annotations and controls. Its open forms and matched Latin characters suit mixed technical copy better than a decorative display face.
- Fonts are bundled as WOFF2 subsets, loaded with font-display: swap, and cached for 30 days. Font licenses live in public/fonts. A local TTF is used for the social preview renderer.
- English body starts at 16px. Arabic labels start at 14px, with longer line height and no artificial letter spacing. URL input stays LTR.

## Grid and spacing

Use 8px spacing steps, a 72px route column above 768px and responsive outer margins. Section padding scales from 48px to 88px. Hero columns become one below 1000px. Project and contact columns become one below 768px. The experience timetable becomes stacked entries. Controls are at least 44px high; form fields are at least 16px to avoid mobile input zoom.

## Motion and interaction

The bus marker follows native scrolling. No content fades, delayed reveals, cursor effects, smooth-scroll library or continuous demo loop. The passenger simulation redraws only when the visitor changes a control or selects another scene. Tap feedback is a 1px press. Reduced motion disables CSS animation and route travel. Skip the ride stops travel and jumps directly to work. The route status panel sits in document flow so it cannot cover content.

## Language, theme and accessibility

Arabic uses RTL layout and logical CSS properties. Theme follows the device preference until explicitly chosen; the saved choice survives reload and language changes. Navigation uses real anchor links. The mobile menu exposes its expanded state; the native command dialog traps focus and supports Escape. All core content is server rendered and readable with JavaScript disabled. Demo explanations and outcomes also exist as text.

## Content and contact

Keep copy specific to supplied experience and verified repositories. Do not invent employment status, metrics or graduate status. The bus and phishing project links are public. The pharmacy project is described from the supplied brief without a fabricated repository link. The contact section uses direct email until Resend and a verified sender are configured. Never report delivery success without provider acceptance.

## Banned patterns

No purple/blue gradients, gradient text, glass effects, grain overlays, emoji headings or controls, Inter, Space Grotesk/Instrument Serif pairing, decorative icon tiles, three matching feature cards, headline badges, low contrast captions, button opacity fades, scroll fades, invented statistics, buzzword claims or excessive em dashes. Keep useful structure, bilingual content and real demos.
