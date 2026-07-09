"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Atmosphere from "@/components/Atmosphere";
import { links, socials } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const romans = ["I", "II", "III", "IV", "V", "VI"];
const GOLD = "#eecb73"; // highlight colour for scroll word-reveals
const DIM = "#5b5346"; // muted start colour (solid hex so gsap eases cleanly)

const socialIcons: Record<string, JSX.Element> = {
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
    </>
  ),
  YouTube: (
    <path d="M23 12s0-3.5-.44-5.06a2.62 2.62 0 0 0-1.85-1.85C19.14 4.65 12 4.65 12 4.65s-7.14 0-8.71.44A2.62 2.62 0 0 0 1.44 6.94C1 8.5 1 12 1 12s0 3.5.44 5.06a2.62 2.62 0 0 0 1.85 1.85c1.57.44 8.71.44 8.71.44s7.14 0 8.71-.44a2.62 2.62 0 0 0 1.85-1.85C23 15.5 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z" fill="currentColor" />
  ),
  TikTok: (
    <path d="M16.6 5.8a4.28 4.28 0 0 1-1.04-2.8h-3.1v12.4a2.32 2.32 0 1 1-2.32-2.32c.24 0 .47.04.69.1V8a5.42 5.42 0 1 0 4.72 5.37V9.09a7.28 7.28 0 0 0 4.28 1.37V7.38a4.28 4.28 0 0 1-3.23-1.58z" fill="currentColor" />
  ),
  Facebook: (
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" fill="currentColor" />
  ),
};

const socialLinks = [
  { label: "Instagram", href: socials.instagram },
  { label: "YouTube", href: socials.youtube },
  { label: "TikTok", href: socials.tiktok },
  { label: "Facebook", href: socials.facebook },
];

const footerIcons: Record<string, JSX.Element> = {
  explore: (
    <path d="M3 21h18M5 10h14M12 4l7 4H5l7-4zM6.5 10v8M10 10v8M14 10v8M17.5 10v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  solutions: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7M3 12.5h18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  resources: (
    <>
      <path d="M6 7h12l-1 13H7L6 7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 12.5l1.7 1.7 3.3-3.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  events: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  connect: (
    <>
      <circle cx="12" cy="8" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

const footerCols = [
  {
    key: "explore",
    title: "Explore",
    links: [
      { label: "The Challenge", href: links.challenge3Day },
      { label: "Secure the Car", href: links.secureTheCar },
      { label: "Black Sheep", href: links.blackSheep },
    ],
  },
  {
    key: "solutions",
    title: "Solutions",
    links: [
      { label: "Services", href: links.services },
      { label: "1:1 Coaching", href: links.appointment },
      { label: "Tax-Free Strategy", href: links.taxFree },
    ],
  },
  {
    key: "resources",
    title: "Resources",
    links: [
      { label: "Digital Store", href: links.shop },
      { label: "Affiliates", href: links.affiliate },
      { label: "Newsletter", href: links.newsletter },
    ],
  },
  {
    key: "events",
    title: "Events",
    links: [{ label: "Events", href: links.events }],
  },
];

// Cohort dates as ISO (YYYY-MM-DD) so they format consistently and can be
// compared to "today" — no stale hardcoded strings. Update start/end when the
// next cohort is scheduled; the label + status relabel themselves.
const challenges = [
  {
    tier: "3-Day",
    title: "Master Your Rights Challenge",
    start: "2026-08-08",
    end: "2026-08-10",
    blurb: "A focused, live intensive to master your rights, fast.",
    href: links.challenge3Day,
  },
  {
    tier: "5-Day",
    title: "Master Your Rights Challenge",
    start: "2026-09-15",
    end: "2026-09-19",
    blurb: "The deep-dive format — equity, law, and private wealth in full.",
    href: links.challenge5Day,
  },
];

/** "August 8 – 10, 2026" (same month) or "Sept 30 – Oct 2, 2026" (crossing). */
function formatRange(startISO: string, endISO: string): string {
  const s = new Date(`${startISO}T00:00:00`);
  const e = new Date(`${endISO}T00:00:00`);
  const mS = s.toLocaleString("en-US", { month: "long" });
  const mE = e.toLocaleString("en-US", { month: "long" });
  const year = e.getFullYear();
  return mS === mE
    ? `${mS} ${s.getDate()} – ${e.getDate()}, ${year}`
    : `${mS} ${s.getDate()} – ${mE} ${e.getDate()}, ${year}`;
}

const pathways = [
  { tag: "Tax-Free", title: "Private Church Strategy", body: "Lawfully grow and protect your wealth tax-free — private strategies studied by top earners.", cta: "Unlock the Tax-Free Strategy", href: links.taxFree },
  { tag: "Course", title: "Secure the Car", body: "The signature course on securing your property through lawful, private process.", cta: "Start the Course", href: links.secureTheCar },
  { tag: "1:1", title: "Coaching & Consulting", body: "Book a private session for tailored lawful and equity insights. Limited appointments.", cta: "Request Your Appointment", href: links.appointment },
  { tag: "Store", title: "Digital Products", body: "Courses, templates, and private-wealth resources — the tools for true financial freedom.", cta: "Shop the Resources", href: links.shop },
  { tag: "Community", title: "Black Sheep Community", body: "Join the members-only community moving differently — support, accountability, and access.", cta: "Join the Community", href: links.blackSheep },
  { tag: "Coming Soon", title: "Financial Literacy for Real Life", body: "Equity, wealth building, and financial literacy the simple way. New program.", cta: "Get on the List", href: links.newsletter },
];

// PLACEHOLDER PROOF — swap these for real member results/quotes before
// relying on this scene. Structure is final; copy is illustrative.
const stats = [
  { value: "2,400+", label: "Members guided" },
  { value: "180+", label: "Live sessions held" },
  { value: "50", label: "States represented" },
  { value: "4.9/5", label: "Member rating" },
];

const testimonials = [
  {
    quote:
      "I walked in knowing nothing about private trusts. Ninety days later I had my structure filed and my assets protected. This is the real curriculum.",
    name: "Marcus D.",
    role: "3-Day Challenge · Atlanta, GA",
  },
  {
    quote:
      "Amyr doesn't sell hype — he teaches the process, step by step, until it clicks. The tax-free strategy alone paid for everything.",
    name: "Renée T.",
    role: "Private Church Strategy · Houston, TX",
  },
  {
    quote:
      "The Black Sheep community is the accountability I never had. Being around people who move differently changed how I build.",
    name: "Jerome W.",
    role: "Black Sheep Member · Detroit, MI",
  },
];

// Founder areas of focus — derived from the academy's offerings (scene I).
// Factual to the brand; the bio prose below is a draft — verify with Amyr.
const founderFocus = [
  "Private Trusts",
  "Asset Protection",
  "Tax-Free Strategy",
  "Lawful Process",
  "Generational Wealth",
];

// The four domains of the Doctrine — right-column index in scene IV.
const domains = [
  { name: "Equity", desc: "The law of fairness, notice, and remedy." },
  { name: "Law", desc: "Lawful process, private standing, and rights." },
  { name: "Commerce", desc: "Contracts, instruments, and value in motion." },
  { name: "Private Wealth", desc: "Trusts, protection, and generational holding." },
];

export default function Homepage() {
  const root = useRef<HTMLDivElement>(null);
  // Server + first client render assume upcoming (shows the date); after mount
  // we know the real clock and can relabel any cohort that has already passed.
  // Rendering the date on both sides first avoids a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    let removeTilt: (() => void) | undefined;

    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(q("[data-enter], [data-depth], [data-sweep], [data-tilt]"), {
          clearProps: "all",
        });
        gsap.set(".atmo-articles", { opacity: 1 });
        return;
      }

      // --- Parallax depth: each plane drifts at a scroll-scrubbed speed set
      //     by data-depth. Values are deliberately spread far apart
      //     (far ~6 → near ~44) so planes visibly separate = real depth. A
      //     touch of scale on the deepest planes deepens the recession. ---
      (q("[data-depth]") as HTMLElement[]).forEach((el) => {
        const d = parseFloat(el.dataset.depth || "0");
        const scene = el.closest(".scene");
        gsap.fromTo(
          el,
          { yPercent: -d },
          {
            yPercent: d,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // --- Pointer-parallax: the "alive" layer. Planes tagged data-tilt ease
      //     toward the cursor, deeper planes moving further, so the page has
      //     dimension even at rest. Composes over the scroll parallax because
      //     GSAP tracks x/y (px, tilt) separately from yPercent (%, scroll).
      //     Fine-pointer only; skipped for touch and reduced-motion. ---
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (fine) {
        const tilters = (q("[data-tilt]") as HTMLElement[]).map((el) => ({
          depth: parseFloat(el.dataset.tilt || "0"),
          x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" }),
        }));
        if (tilters.length) {
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            for (const t of tilters) {
              t.x(nx * t.depth * 42);
              t.y(ny * t.depth * 42);
            }
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          removeTilt = () => window.removeEventListener("pointermove", onMove);
        }
      }

      // --- Doctrine band: the shared library image drifts slower than scroll,
      //     parallaxing from the Doctrine scene down to the Correspondence. ---
      const band = q(".doctrine-band")[0];
      const bandImg = q(".doctrine-bg-img")[0];
      if (band && bandImg) {
        gsap.fromTo(
          bandImg,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: band,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // --- Light sweep: a bright bar passes across each scene on scroll ---
      (q("[data-sweep]") as HTMLElement[]).forEach((el) => {
        const scene = el.closest(".scene");
        gsap.fromTo(
          el,
          { xPercent: -130, opacity: 0 },
          {
            xPercent: 130,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: scene,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // --- Continuous atmosphere grade: one trigger per scene fades its tint
      //     up as it enters center and down as it leaves, so neighbouring
      //     grades crossfade into a single continuous journey. ---
      (q(".scene") as HTMLElement[]).forEach((scene) => {
        const name = scene.dataset.scene;
        if (!name) return;
        const layer = document.querySelector(`.atmo-${name}`) as HTMLElement;
        if (!layer) return;
        ScrollTrigger.create({
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (st) => {
            const o = 1 - Math.abs(st.progress - 0.5) * 2; // triangle 0→1→0
            gsap.set(layer, { opacity: Math.max(0, o) });
          },
        });
      });

      // Drift the ambient light slightly with scroll for life.
      gsap.to(".atmo-drift", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: true },
      });

      // --- Scene entrances (unique per chapter) ---
      const onEnter = (trigger: Element) => ({
        scrollTrigger: { trigger, start: "top 72%", once: true },
      });

      // I. Founder — portrait wipes in, credentials rise.
      const f = q("[data-scene='founder']")[0];
      if (f) {
        gsap.fromTo(
          f.querySelector(".portrait"),
          { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
          { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.1, ease: "power3.out", ...onEnter(f) }
        );
        gsap.from(f.querySelectorAll(".f-line"), {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          ...onEnter(f),
        });
      }

      // II. Challenge — heading pulls focus, cards rise.
      const c = q("[data-scene='challenge']")[0];
      if (c) {
        gsap.from(c.querySelector(".c-head"), {
          y: 24,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          ...onEnter(c),
        });
        gsap.from(c.querySelectorAll(".c-card"), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: c, start: "top 60%", once: true },
        });
      }

      // III. Testimony — heading rises, metrics count into place, quotes deal in.
      const t = q("[data-scene='testimony']")[0];
      if (t) {
        gsap.from(t.querySelector(".t-head"), {
          y: 24,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1,
          ease: "power3.out",
          ...onEnter(t),
        });
        gsap.from(t.querySelectorAll(".t-stat"), {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: t, start: "top 68%", once: true },
        });
        gsap.from(t.querySelectorAll(".t-card"), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: t, start: "top 55%", once: true },
        });
      }

      // IV. Doctrine — section pins and holds while the statement lights up
      //      gold word by word, then releases.
      const s = q("[data-scene='services']")[0];
      if (s) {
        gsap.from(s.querySelectorAll(".s-fade"), {
          y: 18,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          ...onEnter(s),
        });
        const words = s.querySelectorAll(".doc-word");
        gsap.set(words, { color: DIM });
        gsap.to(words, {
          color: GOLD,
          ease: "none",
          stagger: 1,
          scrollTrigger: {
            trigger: s,
            start: "top top",
            end: "+=110%",
            scrub: true,
            pin: true,
          },
        });
      }

      // IV. Articles — the charter is dealt out card by card.
      const a = q("[data-scene='articles']")[0];
      if (a) {
        gsap.from(a.querySelector(".a-head"), {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          ...onEnter(a),
        });
        gsap.from(a.querySelectorAll(".a-card"), {
          y: 70,
          opacity: 0,
          rotateX: -12,
          transformOrigin: "50% 0%",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: a, start: "top 62%", once: true },
        });
      }

      // VI. Correspondence — asymmetric split; both columns rise in on enter.
      //     (No pinned word-reveal here — that mechanic belongs to the Doctrine
      //     alone, so the two scenes don't read as duplicates.)
      const n = q("[data-scene='newsletter']")[0];
      if (n) {
        gsap.from(n.querySelectorAll(".n-line"), {
          y: 22,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          ...onEnter(n),
        });
        gsap.from(n.querySelector(".n-card"), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 62%", once: true },
        });
      }

      // VI. Final — the seal resolves into focus, then breathes.
      const fin = q("[data-scene='final']")[0];
      if (fin) {
        gsap.fromTo(
          fin.querySelector(".seal-wrap"),
          { opacity: 0, scale: 0.92, y: 26, filter: "blur(12px)" },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power3.out",
            ...onEnter(fin),
          }
        );
        // Gentle idle float on the mark itself (separate node, no conflict).
        gsap.to(fin.querySelector(".seal-wrap img"), {
          y: -10,
          duration: 3.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        gsap.from(fin.querySelectorAll(".fin-line"), {
          y: 28,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: fin, start: "top 58%", once: true },
        });
      }

      // --- Narrative spine: the gold thread fills with progress ---
      gsap.to(".spine-fill", {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, root);

    return () => {
      removeTilt?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root} className="relative">
      <Atmosphere />

      {/* Narrative spine */}
      <div className="pointer-events-none fixed left-5 top-0 z-30 hidden h-full w-px bg-white/8 md:block">
        <div className="spine-fill h-full w-full origin-top scale-y-0 bg-gradient-to-b from-gold-bright via-gold to-transparent" />
      </div>

      <main className="relative z-10">
        {/* I. The Founder */}
        <section
          data-scene="founder"
          id="founder"
          className="scene relative flex min-h-screen items-center overflow-hidden py-28"
        >
          {/* far plane */}
          <div
            data-depth="6"
            data-tilt="0.2"
            className="pointer-events-none absolute -left-20 top-10 h-[70vmin] w-[70vmin] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 70%)" }}
          />
          {/* mid plane */}
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div
            data-sweep
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen"
            style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,70,0.10), transparent)" }}
          />
          {/* near plane — foreground column edges that pass in front, fastest & tilt most */}
          <div data-depth="40" data-tilt="0.75" className="pointer-events-none absolute inset-y-0 left-0 w-[16vw] max-w-[180px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="44" data-tilt="0.85" className="pointer-events-none absolute inset-y-0 right-0 w-[16vw] max-w-[180px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[0.85fr_1fr]">
            <div className="relative mx-auto w-full max-w-xs" data-tilt="0.3">
              <div className="pointer-events-none absolute -inset-6 rounded-full" style={{ background: "radial-gradient(circle, rgba(120,70,160,0.4) 0%, rgba(5,5,5,0) 70%)" }} />
              <Image
                src="/amyr-hero-portrait.jpg"
                alt="Amyr Samah El, founder of Matisse Academy"
                width={654}
                height={963}
                className="portrait relative aspect-[4/5] rounded-2xl border border-white/10 object-cover object-top shadow-2xl"
              />
            </div>
            <div>
              <p className="f-line mb-5 text-xs uppercase tracking-luxe text-gold/70">
                I · The Founder
              </p>
              <h2 className="f-line font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
                Amyr Samah El
              </h2>
              <p className="f-line mt-4 text-xs uppercase tracking-[0.25em] text-gold-gradient">
                Private Trust &amp; Wealth Protection Strategist
              </p>
              <div className="f-line rule-luxe my-7 max-w-[8rem]" />
              <p className="f-line max-w-lg text-base leading-relaxed text-white/60">
                Amyr Samah El built his practice around a single conviction: the
                private side of law and finance — trusts, notice, and equity — is
                the real path to protecting what you build. His work brings the
                lawful strategies once reserved for the few within reach of
                ordinary families.
              </p>
              <blockquote className="f-line mt-7 max-w-lg border-l-2 border-gold/40 pl-5 font-serif text-lg italic leading-relaxed text-white/75">
                &ldquo;I guide individuals and families to protect their assets,
                minimize liabilities, and secure generational wealth through
                private trusts and lawful strategies.&rdquo;
              </blockquote>

              {/* Areas of focus */}
              <div className="f-line mt-8">
                <p className="mb-3 text-[0.65rem] uppercase tracking-luxe text-gold/60">
                  Areas of Focus
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {founderFocus.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-gold/25 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.15em] text-white/60"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={links.appointment} {...ext} className="f-line btn-lux mt-9">
                Work With Amyr
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* II. The Summons */}
        <section
          data-scene="challenge"
          id="challenge"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-28"
        >
          <div data-depth="6" data-tilt="0.2" className="pointer-events-none absolute left-1/2 top-0 h-[55vmin] w-[85vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.3) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.12), transparent)" }} />
          {/* near foreground edges */}
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 left-0 w-[14vw] max-w-[160px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 right-0 w-[14vw] max-w-[160px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
            <div className="c-head">
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">II · The Summons</p>
              <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
                The <span className="text-gold-gradient">Master Your Rights</span> Challenge
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
                An immersive challenge on equity, law, and private wealth — taught live. Choose the format that fits you.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
              {challenges.map((c) => {
                const past = mounted && new Date(`${c.end}T23:59:59`) < new Date();
                return (
                  <div key={c.tier} className="c-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-10 text-left backdrop-blur-sm">
                    <span className="font-serif text-5xl text-gold-gradient">{c.tier}</span>
                    <h3 className="mt-4 font-serif text-xl text-white">{c.title}</h3>
                    <p className="mt-1 text-sm font-medium text-gold-bright">
                      {past ? "New dates announced soon" : formatRange(c.start, c.end)}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{c.blurb}</p>
                    <a
                      href={past ? links.events : c.href}
                      {...ext}
                      className="btn-lux btn-lux-sm mt-6 self-start"
                    >
                      {past ? "Join the Waitlist" : "Secure My Spot"}
                    </a>
                  </div>
                );
              })}
            </div>
            <a href={links.events} {...ext} className="c-card mt-20 inline-block text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white">
              See all upcoming events →
            </a>
          </div>
        </section>

        {/* III. The Testimony — social proof: the record speaks. */}
        <section
          data-scene="testimony"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-28"
        >
          {/* far / mid / near parallax planes, matching the depth system */}
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute left-1/2 top-1/3 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.26) 0%, rgba(5,5,5,0) 66%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.10), transparent)" }} />
          <div data-depth="40" data-tilt="0.75" className="pointer-events-none absolute inset-y-0 left-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="t-head text-center">
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">III · The Testimony</p>
              <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
                Proof, not <span className="text-gold-gradient">promises.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
                The record of those who chose to move differently — and built something lawful, private, and lasting.
              </p>
            </div>

            {/* Metrics ledger */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="t-stat text-center">
                  <div className="font-serif text-4xl text-gold-gradient sm:text-5xl">{s.value}</div>
                  <div className="mt-2 text-[0.68rem] uppercase tracking-luxe text-white/45">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="rule-luxe mx-auto my-14 max-w-2xl" />

            {/* Witness quotes */}
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="t-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-9 backdrop-blur-sm">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold/50" aria-hidden>
                    <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6.5A1.5 1.5 0 0 1 8 8.5V7zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3.5A1.5 1.5 0 0 1 19 8.5V7z" fill="currentColor" />
                  </svg>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/70">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-6">
                    <div className="font-serif text-lg text-white">{t.name}</div>
                    <div className="mt-0.5 text-[0.65rem] uppercase tracking-luxe text-gold/60">{t.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Doctrine band — the single law-library image parallaxes behind the
            Doctrine, Charter, and Correspondence scenes as one continuous
            atmosphere, drifting slower than the scroll. */}
        <div className="doctrine-band relative">
          {/* Sticky, viewport-sized so the image stays crisp and holds behind
              all three scenes while they scroll over it — the parallax. */}
          <div className="pointer-events-none absolute inset-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <Image src="/bg-library.jpg" alt="" fill sizes="100vw" className="doctrine-bg-img object-cover object-center opacity-[0.14] grayscale-[0.3]" style={{ transform: "scale(1.12)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(58,42,96,0.4) 0%, rgba(5,5,5,0.2) 50%, rgba(176,120,42,0.16) 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0) 16%, rgba(5,5,5,0) 84%, #050505 100%), radial-gradient(120% 100% at 50% 50%, rgba(5,5,5,0) 52%, rgba(5,5,5,0.5) 100%)" }} />
            </div>
          </div>

        {/* III. The Doctrine */}
        <section
          data-scene="services"
          id="services"
          className="scene relative flex min-h-screen items-center overflow-hidden py-28"
        >
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute left-0 top-1/2 h-[75vmin] w-[75vmin] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(58,58,128,0.32) 0%, rgba(5,5,5,0) 66%)" }} />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(120,120,200,0.10), transparent)" }} />
          <div data-depth="40" data-tilt="0.7" className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="s-fade mb-6 text-xs uppercase tracking-luxe text-gold/70">IV · The Doctrine</p>
              <h2 className="max-w-xl font-serif text-3xl leading-[1.16] text-white sm:text-5xl">
                {"Mastery in equity, law, commerce, and private wealth — taught as one discipline."
                  .split(" ")
                  .map((w, i) => (
                    <span key={i} className="doc-word">
                      {w}{" "}
                    </span>
                  ))}
              </h2>
              <a href={links.services} {...ext} className="s-fade btn-lux mt-10">
                Explore Our Services
                <span aria-hidden>→</span>
              </a>
            </div>

            {/* Right column — the four domains as a numbered ledger. */}
            <div className="s-fade">
              <div className="rule-luxe mb-8 max-w-[8rem]" />
              <ul>
                {domains.map((d, i) => (
                  <li key={d.name} className="flex items-baseline gap-5 border-b border-white/8 py-5">
                    <span className="font-serif text-2xl leading-none text-gold-gradient">{romans[i]}</span>
                    <div>
                      <div className="font-serif text-xl text-white">{d.name}</div>
                      <div className="mt-1 text-sm leading-relaxed text-white/50">{d.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* IV. The Charter */}
        <section
          data-scene="articles"
          className="scene relative overflow-hidden border-t border-white/5 py-28"
        >
          <div data-depth="6" data-tilt="0.2" className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[95vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(108,60,150,0.26) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,80,0.10), transparent)" }} />

          <div className="relative mx-auto max-w-6xl px-6" style={{ perspective: "1200px" }}>
            <div className="a-head mb-14 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">V · The Charter</p>
              <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.12] text-white sm:text-4xl">
                Six articles, one path to private mastery.
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pathways.map((p, i) => (
                <article key={p.title} className="a-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-10 backdrop-blur-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-3xl leading-none text-gold-gradient">{romans[i]}</span>
                    <span className="text-[0.65rem] uppercase tracking-luxe text-gold/70">{p.tag}</span>
                  </div>
                  <div className="rule-luxe my-5" />
                  <h3 className="font-serif text-2xl text-white">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{p.body}</p>
                  <a href={p.href} {...ext} className="mt-7 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white">{p.cta} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* V. The Correspondence */}
        <section
          data-scene="newsletter"
          className="scene relative flex min-h-screen items-center overflow-hidden py-24"
        >
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute right-0 top-1/2 h-[60vmin] w-[80vmin] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,132,52,0.26) 0%, rgba(5,5,5,0) 68%)" }} />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <p className="n-line mb-6 text-xs uppercase tracking-luxe text-gold/70">VI · The Correspondence</p>
              <h2 className="max-w-xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl">
                Equity, law, and private wealth —{" "}
                <span className="text-gold-gradient">straight to your inbox.</span>
              </h2>
              <p className="n-line mt-6 max-w-md text-base leading-relaxed text-white/55">
                Occasional dispatches — private strategies, event notices, and lawful insights, sent only when they matter.
              </p>
            </div>

            {/* The dispatch — a framed, sealed-letter panel. */}
            <div className="n-card relative">
              <div className="relative overflow-hidden rounded-2xl border border-gold/25 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
                <div className="pointer-events-none absolute -right-8 -top-10 opacity-[0.07]">
                  <Image src="/logo-mark.png" alt="" width={220} height={147} className="h-40 w-auto object-contain" />
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-[0.68rem] uppercase tracking-luxe text-gold/70">The Dispatch</span>
                </div>
                <div className="rule-luxe my-6" />
                <p className="text-sm leading-relaxed text-white/60">
                  Join the correspondence and receive the record as it&rsquo;s written — no noise, no filler, only what advances your mastery.
                </p>
                <a href={links.newsletter} {...ext} className="btn-lux mt-8 w-full justify-center">
                  Join the Newsletter
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
        </div>
        {/* /doctrine-band */}

        {/* VI. The Seal */}
        <section
          data-scene="final"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-32 text-center"
        >
          <div data-depth="6" data-tilt="0.24" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(120,70,160,0.26) 0%, rgba(5,5,5,0) 66%)" }} />
          <div data-depth="40" data-tilt="0.7" className="pointer-events-none absolute inset-y-0 left-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="40" data-tilt="0.7" className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto max-w-2xl px-6">
            <div className="seal-wrap mb-10 flex justify-center">
              <Image
                src="/logo-mark.png"
                alt="Matisse Academy"
                width={900}
                height={600}
                className="h-44 w-auto object-contain drop-shadow-[0_0_50px_rgba(120,70,160,0.4)]"
              />
            </div>
            <p className="fin-line mb-6 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
              VII · The Seal — Matthew 4:19 · KJV 1611
            </p>
            <h2 className="fin-line mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
              Notice is the heart of <span className="text-gold-gradient">equity.</span>
            </h2>
            <p className="fin-line mx-auto mt-5 max-w-lg text-sm text-white/50">
              Begin your path to mastery in private wealth and lawful strategy.
            </p>
            <a href={links.challenge3Day} {...ext} className="fin-line btn-lux mt-10">
              Secure My Spot
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* Footer — the charter colophon */}
        <footer className="relative z-10 overflow-hidden border-t border-white/8">
          {/* Faint shield watermark + purple accent, top-right. */}
          <div className="pointer-events-none absolute -right-6 -top-10 opacity-[0.06]">
            <Image src="/logo-mark.png" alt="" width={520} height={347} className="h-[24rem] w-auto object-contain" />
          </div>
          <div
            className="pointer-events-none absolute right-0 top-0 h-72 w-2/3"
            style={{ background: "radial-gradient(55% 100% at 82% 0%, rgba(120,70,160,0.2) 0%, rgba(5,5,5,0) 70%)" }}
          />

          {/* Top band */}
          <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-16">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-gold/60">
                  The Charter Awaits
                </p>
                <h2 className="mt-4 font-serif text-5xl leading-[1.02] text-white sm:text-6xl">
                  Begin your <span className="text-gold-gradient">charter.</span>
                </h2>
                <p className="mt-5 text-sm text-white/45">
                  Your legacy starts with a decision.
                </p>
              </div>
              <a href={links.challenge3Day} {...ext} className="btn-lux shrink-0">
                Secure My Spot
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Divider with a centred chevron notch */}
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="border-t border-gold/25" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-gold/70">
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Link columns */}
          <div className="relative mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
              {footerCols.map((col, ci) => (
                <div key={col.key} className={ci > 0 ? "md:border-l md:border-white/8 md:pl-8" : ""}>
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-bright">{footerIcons[col.key]}</svg>
                    <span className="text-[0.68rem] uppercase tracking-luxe text-gold/70">{col.title}</span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} {...ext} className="text-sm text-white/60 transition-colors hover:text-gold-bright">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {/* Connect */}
              <div className="md:border-l md:border-white/8 md:pl-8">
                <div className="flex items-center gap-2.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-gold-bright">{footerIcons.connect}</svg>
                  <span className="text-[0.68rem] uppercase tracking-luxe text-gold/70">Connect</span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  Join a community of high achievers building generational impact.
                </p>
                <a href={links.appointment} {...ext} className="mt-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-luxe text-[#a878e0] transition-colors hover:text-white">
                  Contact Us <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative border-t border-white/8">
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-3 md:items-center">
              <div className="flex items-center gap-4">
                <Image src="/logo-mark.png" alt="Matisse Academy" width={140} height={93} className="h-12 w-auto object-contain" />
                <div>
                  <p className="font-serif text-xl leading-none text-gold-gradient">Matisse Academy</p>
                  <p className="mt-1.5 font-serif text-sm italic text-white/55">
                    &ldquo;Notice is the heart of equity.&rdquo;
                  </p>
                  <p className="mt-1 text-[0.58rem] uppercase tracking-[0.3em] text-gold/45">Matthew 4:19</p>
                </div>
              </div>
              <div className="text-center text-xs text-white/35">
                <p>© {new Date().getFullYear()} Matisse Academy. All rights reserved.</p>
                <p className="mt-2">
                  <a href="https://matisseacademy.com" {...ext} className="transition-colors hover:text-white">Privacy Policy</a>
                  <span className="mx-2 text-white/20">|</span>
                  <a href="https://matisseacademy.com" {...ext} className="transition-colors hover:text-white">Terms of Service</a>
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <p className="text-[0.65rem] uppercase tracking-luxe text-gold/60">Follow Us</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} {...ext} aria-label={s.label} className="press flex h-10 w-10 items-center justify-center rounded-full border border-gold/45 text-gold-bright transition-colors hover:bg-gold hover:text-black">
                      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" aria-hidden>{socialIcons[s.label]}</svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Legal disclaimer strip */}
          <div className="relative border-t border-white/5">
            <p className="mx-auto max-w-4xl px-6 py-6 text-center text-[0.66rem] leading-relaxed text-white/25">
              For informational purposes only. We are not BAR-card licensed
              enrollees, nor is any content herein legal, tax, or financial advice.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
