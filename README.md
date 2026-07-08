# Matisse Academy — Cinematic Intro

Premium cinematic entrance for the Matisse Academy site. A 3D gold-and-royal
logo breathes in a matte-black void; on scroll it shrinks and travels into its
permanent navigation slot while the homepage progressively reveals beneath it.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger (scroll-scrubbed transition)

No Three.js — the hero uses the pre-rendered 3D logo (transparent PNG), animated
transform-only for a solid 60fps and clean `prefers-reduced-motion` support.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure
- `app/` — layout, page, global styles
- `components/CinematicIntro.tsx` — the pinned intro + scroll timeline
- `components/Homepage.tsx` — philosophy / pillars / admissions sections
- `lib/motion.ts` — **all** animation values (timings, distances, scales). Tune
  the motion here; no magic numbers live in the components.
- `public/logo-3d.png` — 3D logo with the black background baked out to alpha
  (max-channel key, generated from `3D logo.png`).

## Accessibility
`prefers-reduced-motion: reduce` collapses the pinned scroll region and presents
the finished homepage immediately — no forced motion, no dead scroll.
