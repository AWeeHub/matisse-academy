# Build Prompt — Matisse Academy Website

A complete brief to rebuild this website from scratch (e.g. with an AI coding
agent or a developer). Copy everything below the line as the prompt.

---

## Goal
Build a **cinematic, premium marketing website** for **Matisse Academy**, an
equity / law / private-wealth **education brand** founded by **Amyr Samah El**.
The feel is dark, editorial, and luxurious — deep black, gold, and royal purple,
serif display type, restrained motion. It is NOT an art school and Amyr is NOT a
licensed attorney (he is an equity educator / "Government Activist"). Two pages:
a **homepage** and an **About / founder** page.

## Tech
- **Next.js 14 App Router + TypeScript**, **Tailwind CSS**, **GSAP + ScrollTrigger**.
- Static front-end (no backend/DB). All primary CTAs open external GoHighLevel
  funnel URLs in a new tab. Deploy on **Vercel** (push-to-`main` auto-deploy).
- Fully responsive (mobile-first correct), respects `prefers-reduced-motion`,
  zero console errors, Lighthouse: BP/SEO 100, A11y ≥ 95.

## Design system
- **Colors:** void black `#050505`; gold family (bright `#eecb73`/`#f4d38a`,
  gradient gold text); royal purple accents (`#6c3c96`, `#7846a0`).
- **Type:** serif display for headings (e.g. a refined serif), clean sans for body.
  Small-caps eyebrows with wide letter-spacing (`tracking-luxe`).
- **Signature CTA** (`.btn-lux`): dark pill, hairline gold border, a gold light
  that travels **around the border edge only** (masked conic-gradient ring via
  `@property --angle` + `mask-composite: exclude`), soft outer glow, NO interior
  bleed. Arrow that nudges on hover.
- **Cards:** subtle lift + gold glow on hover; testimonial cards add a slight tilt.
- **Reveal:** a reusable component that fades + rises elements in on scroll
  (IntersectionObserver + a `.rise`/`.is-in` CSS transition), reduced-motion safe.
- Film-grain overlay, hairline gold rules, a shield "MA" logo mark.

## Global chrome
- **Header (both pages):** logo mark + wordmark, desktop mega-menu
  (Home · Solutions · Events · Resources · About with dropdown panels), a
  "Secure My Spot" gold CTA (desktop only), and a mobile hamburger that opens a
  full-height drawer (portalled to `<body>`). Nav data from a single source of truth.
- **Footer (shared):** brand lockup + "Notice is the Heart of Equity — Matthew 4:19"
  tagline + mission blurb; link columns **Solutions / Events / Resources**; a
  **Connect** column with gold-circle social icons (Instagram, YouTube, TikTok,
  Facebook); bottom bar with © year, Privacy Policy, Terms of Service, and a
  **legal disclaimer**: "Matisse Academy provides educational information only.
  Amyr Samah El is not a BAR-licensed attorney and nothing here is legal advice."

## Homepage (`/`) — chaptered scroll story
Full-screen photographic **hero**: a dark law-library scene (LAW tome, brass
scales, gavel, gold light through an arched window). Headline reads at rest:
**"Notice is the heart of equity"** (gold "of equity"), "Matthew 4:19 · KJV 1611",
a one-line subline, and a "Secure My Spot" CTA. Gentle scroll parallax.

Then six chaptered full-viewport sections, each with its own atmosphere, a gold
"chapter line" that draws in, and a left-edge chapter-rail dot tracker:
1. **I · The Summons** — "The Master Your Rights Challenge"; two event cards
   (3-Day / 5-Day) with self-formatting ISO dates + CTAs; "See all events" link.
2. **II · The Testimony** — "Proof, not promises."; a **4-stat row with icons**
   that **count up** when scrolled into view (Members Guided / Live Sessions Held /
   States Represented / Member Rating); three **testimonial cards** (quote + name +
   role, no avatars) that stagger in and tilt on hover.  *(Use clearly-labeled
   placeholder data; the owner supplies real numbers/quotes.)*
3. **III · The Doctrine** — asymmetric: left = word-by-word gold-highlight
   statement + "Explore Our Services" CTA; right = a numbered ledger of the four
   domains. On mobile the CTA falls **below** the ledger.
4. **IV · The Charter** — the offering/articles.
5. **V · The Correspondence** — newsletter / "The Dispatch" split.
6. **VI · The Seal** — full-bleed **purple-gold cosmic skyline** background
   (zoomed so no water shows), the shield mark, "The record is open. Add your
   name.", and a final CTA.
Continuous color-grade atmosphere layers + a drifting gold-dust particle field.

## About page (`/about`) — the founder
- **Static hero** (no scroll parallax): a premium night-skyline composite
  (skyline + American flag + gold water + dust) with the **real Amyr** as a
  transparent cutout on the right. Eyebrow "About the Founder", "Meet /
  **Amyr Samah El.**" (gold), a short strategist/educator bio, an italic
  pull-quote with a gold left-border, and a "Work With Amyr" CTA. Ambient gold
  dust + slow light sweep + vignette. On mobile, show Amyr smaller in the corner.
- A slim **capabilities strip** (gold-dot-separated: Private Trusts · Asset
  Protection · Tax-Free Strategy · Lawful Process · Generational Wealth).
- **I · The Journey** — an editorial gold-rail **timeline** (01 A courtroom of
  his own / 02 Remedy over conflict / 03 Teaching what protects), each with a
  short paragraph.
- **II · The Doctrine** — the video: "The doctrine, in his own voice." with a
  glowing play button and a "Watch Video" corner label. Use a light YouTube
  embed gated behind an `EMBED_ENABLED` flag (poster opens YouTube while
  embedding is off).
- **III · Our Mission** — a typographic manifesto over a **CSS purple-gold
  nebula + gold starfield** (no external image): "A private institution / for
  equitable justice." + mission copy + "Notice is the heart of equity" · Matthew 4:19.
- **IV · Our Domains** — a 2×2 icon grid over a purple-gold particle background:
  01 Equity (shield) / 02 Law (scales) / 03 Commerce (landmark) / 04 Private
  Wealth (crown), each with big gold number + line icon + short description, with
  divider lines between the rows.
- Shared footer closes the page (no duplicate charter CTA).

## Content truth rules
- Do **not** fabricate statistics or testimonials — mark any sample data clearly
  and let the owner supply real, verifiable figures/quotes.
- Keep the not-BAR-licensed disclaimer; don't imply Amyr is an attorney.

## Real brand facts (from matisseacademy.com)
- Founder **Amyr Samah El**, "Private Trust & Wealth Protection Strategist",
  socials `@amyr_law` / `@amyrlaw`. Offerings: Master Your Rights Challenge
  (3/5-day), Services (equity/law/commerce/private wealth), Tax-Free "private
  church" strategy, 1:1 coaching, Digital Store, Black Sheep Community.
  Tagline: "Notice is the Heart of Equity — Matthew 4:19". Palette: gold + royal
  purple on black. CTAs link to the matisseacademy.com GoHighLevel funnels.
