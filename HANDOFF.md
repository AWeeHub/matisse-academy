# Matisse Academy — Website Handoff

The cinematic marketing site for **Matisse Academy** (founder **Amyr Samah El**).
Two pages: the homepage (`/`) and the founder page (`/about`).

**Live:** https://matisse-academy.vercel.app

---

## 1. Tech stack

- **Next.js 14 (App Router) + TypeScript**
- **Tailwind CSS** for styling
- **GSAP + ScrollTrigger** for the scroll animations
- No database, no backend, no API keys, no environment secrets — it is a static
  front-end. All sign-up / checkout CTAs link out to the `matisseacademy.com`
  (GoHighLevel) funnels defined in `lib/links.ts`.

> This is a **coded** site, not a drag-and-drop CMS. Content/design changes are
> made by editing the code and pushing to GitHub (a developer is needed). It
> **cannot** be pasted into the GHL page builder — keep it on Vercel and point a
> domain at it.

## 2. Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## 3. Deploy

Hosted on **Vercel**, connected to the GitHub repo. **Every push to `main`
auto-deploys to production.** No manual step.

### Move it to the owner's own accounts (full ownership)
1. **GitHub:** repo → Settings → *Transfer ownership* → owner's account.
2. **Vercel:** owner creates a Vercel account → *Import* the repo → it deploys
   under their account (push-to-`main` = live). Delete the old project after.
3. **Domain:** owner adds the domain in Vercel (Settings → Domains) and points
   the DNS (A / CNAME) at Vercel from their registrar.

---

## 4. Where to change things (the important slots)

### Video (the "Hear From Amyr" player on `/about`)
- File: `components/VideoEmbed.tsx` — constant **`EMBED_ENABLED`**.
  - The `@amyrlaw` YouTube channel currently has **embedding disabled** (YouTube
    Error 153), so the video can't play inline. The poster opens YouTube instead.
  - **To make it play inside the site:** in YouTube Studio → Content → edit the
    video → *Show more* → tick **"Allow embedding"** → Save. Then set
    `EMBED_ENABLED = true` here and redeploy. (Or self-host an `.mp4`.)
- The video id lives in `app/about/page.tsx` → `FOUNDER_VIDEO_ID`.

### Social-proof stats + testimonials (homepage "II · The Testimony")
- File: `components/Homepage.tsx` → **`stats`** and **`testimonials`** arrays.
- ⚠️ **These are PLACEHOLDER / sample data** (`2,400+ / 180+ / 50 / 4.9/5` and
  the three quotes). **Replace with real, verifiable numbers and real member
  quotes before relying on them** — or remove them.

### Challenge dates (homepage "I · The Summons")
- File: `components/Homepage.tsx` → **`challenges`** array. Dates are ISO
  (`start` / `end`); the labels format themselves and auto-relabel to
  "New dates announced soon" once past. Just update `start`/`end`.

### Links, navigation, socials
- `lib/links.ts` — all funnel destinations (matisseacademy.com/...) + social URLs.
- `lib/nav.ts` — header menu structure.

### Brand copy / bio
- Homepage sections: `components/Homepage.tsx`.
- Founder page: `app/about/page.tsx`.

### Images (in `/public`)
| File | Where it's used |
|------|-----------------|
| `logo-mark.png` | header, footer, homepage "Seal" mark |
| `home-hero.jpg` | homepage hero (law library) |
| `about-bg.jpg` + `amyr-cut.png` | About hero (skyline + Amyr cutout) |
| `seal-bg.jpg` | homepage "VI · The Seal" |
| `domains-bg.jpg` | About "IV · Our Domains" |
| `bg-library.jpg` | homepage doctrine-band texture |
| `amyr-suit-portrait.jpg` | **source** for `amyr-cut.png` (kept for re-cutting) |

- `amyr-cut.png` (transparent Amyr) was produced from `amyr-suit-portrait.jpg`
  with background-removal (`rembg`, model `u2net_human_seg`). To make a new
  cutout: `pip install rembg onnxruntime` then remove the background and save a
  transparent PNG.
- Keep background images compressed (JPEG, ≤ ~1920px wide, ~200–250 KB each) so
  the site stays fast.

---

## 5. Legal / content notes
- The footer disclaimer ("not a BAR-licensed attorney… not legal advice") is
  intentional — **keep it**. Amyr styles himself an equity educator, not a
  licensed attorney; avoid attorney/legal-advice claims in copy.

## 6. Project map
```
app/
  page.tsx            # homepage (Preloader + CinematicIntro)
  about/page.tsx      # founder page
  globals.css         # design system + keyframes
components/
  CinematicIntro.tsx  # homepage hero + wraps Homepage
  Homepage.tsx        # the 6 chaptered homepage scenes + testimony/stats
  AboutHero.tsx       # About hero (skyline + Amyr)
  SiteFooter.tsx      # shared footer (both pages)
  VideoEmbed.tsx      # the video player (EMBED_ENABLED flag)
  NavMenu.tsx / MobileNav.tsx   # desktop + mobile nav
  Reveal.tsx          # scroll-in reveal helper
  Atmosphere.tsx / Particles.tsx / ChapterRail.tsx
lib/
  links.ts  nav.ts  motion.ts
public/               # images
```
