# Hero Preview — saved for future use

> Decision (2026-07-10): the **live homepage stays the original WebGL chamber
> intro** (`app/page.tsx` → `Preloader` + `CinematicIntro`). The alternate
> photographic hero below is **parked here, not shipped to the homepage.**

## Where it lives

Route: **`/hero-preview`** (`app/hero-preview/page.tsx`) — an unlinked page, so
it deploys but nothing on the site points to it. Safe to keep.

Components:
- `components/LayeredHero.tsx` — the hero
- `components/Slider3D.tsx` — the 3D program slider
- Images in `public/hero/` (staged from `generated images/` — low-res
  placeholders; swap for crisp cut-outs before any real launch)

## What it contains (three effects, inspired by a neuwebstudio reference)

1. **Logo-split intro** — the Matisse Academy mark assembles on black, holds a
   beat, then two full-screen curtains (clip-path split at exactly 50%) slide
   apart, cutting the logo in half to reveal the hero behind.
2. **Immersive reveal** — the deep scene settles from an over-zoom as the doors
   part; headline masks up line by line.
3. **3D coverflow slider** — the six programmes as cards in perspective; active
   faces front, neighbours angle back + dim; prev/next + dots + Discover links.

## To promote it to the live homepage later

Replace `app/page.tsx`'s `<CinematicIntro />` with `<LayeredHero />` (+ the rest
of `Homepage` / `Slider3D` as desired). Before doing so:
- swap `public/hero/*` for high-resolution / cut-out art (the current tiles are
  384px placeholders + one licensed Pexels scales photo),
- decide whether this logo-split intro replaces the chamber's logo-zoom intro
  (don't ship both — redundant).
