"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Atmosphere from "@/components/Atmosphere";
import Particles from "@/components/Particles";
import ChapterRail from "@/components/ChapterRail";
import SiteFooter from "@/components/SiteFooter";
import { links } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const romans = ["I", "II", "III", "IV", "V", "VI"];
const GOLD = "#eecb73"; // highlight colour for scroll word-reveals
const DIM = "#5b5346"; // muted start colour (solid hex so gsap eases cleanly)

// Cohort dates as ISO (YYYY-MM-DD) so they format consistently and can be
// compared to "today" — no stale hardcoded strings. Update start/end when the
// next cohort is scheduled; the label + status relabel themselves.
const challenges = [
  {
    tier: "3-Day",
    title: "Master Your Rights Challenge",
    start: "2026-07-13",
    end: "2026-07-15",
    blurb: "A focused live intensive — master your rights, fast.",
    href: links.challenge3Day,
  },
  {
    tier: "5-Day",
    title: "Master Your Rights Challenge",
    start: "2026-09-15",
    end: "2026-09-19",
    blurb: "The deep-dive format — equity, law, and wealth in full.",
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

// Gold hairline drawn across a chapter's top edge as it enters (see the
// .chapter-line GSAP block). One per scene = a felt "new chapter" beat.
function ChapterLine() {
  return (
    <span
      aria-hidden
      className="chapter-line pointer-events-none absolute inset-x-0 top-0 z-20 h-px w-full origin-left scale-x-0"
      style={{
        background:
          "linear-gradient(90deg, rgba(217,164,65,0) 0%, rgba(243,205,122,0.75) 18%, rgba(217,164,65,0.45) 55%, rgba(217,164,65,0) 100%)",
      }}
    />
  );
}

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
        gsap.set(q(".chapter-line"), { scaleX: 1 });
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

      // --- Chapter-opener rule: a gold hairline draws across the top of each
      //     chapter as it enters — the felt beat of turning to a new page. ---
      (q(".chapter-line") as HTMLElement[]).forEach((line) => {
        const scene = line.closest(".scene");
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            transformOrigin: "left",
            scrollTrigger: { trigger: scene, start: "top 82%", once: true },
          }
        );
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
      <Particles />
      <ChapterRail />

      <main className="relative z-10">
        {/* I. The Summons */}
        <section
          data-scene="challenge"
          id="challenge"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-28"
        >
          <ChapterLine />
          <div data-depth="6" data-tilt="0.2" className="pointer-events-none absolute left-1/2 top-0 h-[55vmin] w-[85vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.3) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.12), transparent)" }} />
          {/* near foreground edges */}
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 left-0 w-[14vw] max-w-[160px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 right-0 w-[14vw] max-w-[160px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto w-full max-w-5xl px-6 text-center">
            <div className="c-head">
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">I · The Summons</p>
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
          <ChapterLine />
          {/* far / mid / near parallax planes, matching the depth system */}
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute left-1/2 top-1/3 h-[70vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.26) 0%, rgba(5,5,5,0) 66%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.10), transparent)" }} />
          <div data-depth="40" data-tilt="0.75" className="pointer-events-none absolute inset-y-0 left-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(90deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0) 100%)" }} />
          <div data-depth="42" data-tilt="0.8" className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto w-full max-w-6xl px-6">
            <div className="t-head text-center">
              <p className="mb-5 text-xs uppercase tracking-luxe text-gold/70">II · The Testimony</p>
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
          <ChapterLine />
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute left-0 top-1/2 h-[75vmin] w-[75vmin] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(58,58,128,0.32) 0%, rgba(5,5,5,0) 66%)" }} />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(120,120,200,0.10), transparent)" }} />
          <div data-depth="40" data-tilt="0.7" className="pointer-events-none absolute inset-y-0 right-0 w-[13vw] max-w-[150px]" style={{ background: "linear-gradient(270deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0) 100%)" }} />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="s-fade mb-6 text-xs uppercase tracking-luxe text-gold/70">III · The Doctrine</p>
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
          <ChapterLine />
          <div data-depth="6" data-tilt="0.2" className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[95vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(108,60,150,0.26) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="16" data-tilt="0.4" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,80,0.10), transparent)" }} />

          <div className="relative mx-auto max-w-6xl px-6" style={{ perspective: "1200px" }}>
            <div className="a-head mb-14 text-center">
              <p className="mb-4 text-xs uppercase tracking-luxe text-gold/70">IV · The Charter</p>
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
          <ChapterLine />
          <div data-depth="6" data-tilt="0.22" className="pointer-events-none absolute right-0 top-1/2 h-[60vmin] w-[80vmin] -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,132,52,0.26) 0%, rgba(5,5,5,0) 68%)" }} />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1fr_0.82fr]">
            <div>
              <p className="n-line mb-6 text-xs uppercase tracking-luxe text-gold/70">V · The Correspondence</p>
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
          <ChapterLine />
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
              VI · The Seal — Matthew 4:19 · KJV 1611
            </p>
            <h2 className="fin-line mx-auto max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-6xl">
              The record is open. Add <span className="text-gold-gradient">your name.</span>
            </h2>
            <p className="fin-line mx-auto mt-5 max-w-lg text-sm text-white/50">
              Notice was the beginning. Mastery in private wealth and lawful strategy is the path — and it starts with a single decision.
            </p>
            <a href={links.challenge3Day} {...ext} className="fin-line btn-lux mt-10">
              Secure My Spot
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* Footer — the charter colophon */}
        <SiteFooter />
      </main>
    </div>
  );
}
