"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
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

const challenges = [
  {
    tier: "3-Day",
    title: "Master Your Rights Challenge",
    dates: "August 8 – 10, 2026",
    blurb: "A focused, live intensive to master your rights, fast.",
    href: links.challenge3Day,
  },
  {
    tier: "5-Day",
    title: "Master Your Rights Challenge",
    dates: "September 15 – 19, 2026",
    blurb: "The deep-dive format — equity, law, and private wealth in full.",
    href: links.challenge5Day,
  },
];

const pathways = [
  { tag: "Tax-Free", title: "Private Church Strategy", body: "Lawfully grow and protect your wealth tax-free — private strategies studied by top earners.", cta: "Unlock the Tax-Free Strategy", href: links.taxFree },
  { tag: "Course", title: "Secure the Car", body: "The signature course on securing your property through lawful, private process.", cta: "Start the Course", href: links.secureTheCar },
  { tag: "1:1", title: "Coaching & Consulting", body: "Book a private session for tailored lawful and equity insights. Limited appointments.", cta: "Request Your Appointment", href: links.appointment },
  { tag: "Store", title: "Digital Products", body: "Courses, templates, and private-wealth resources — the tools for true financial freedom.", cta: "Shop the Resources", href: links.shop },
  { tag: "Community", title: "Black Sheep Community", body: "Join the members-only community moving differently — support, accountability, and access.", cta: "Join the Community", href: links.blackSheep },
  { tag: "Coming Soon", title: "Financial Literacy for Real Life", body: "Equity, wealth building, and financial literacy the simple way. New program.", cta: "Get on the List", href: links.newsletter },
];

export default function Homepage() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(q("[data-enter], [data-depth], [data-sweep]"), {
          clearProps: "all",
        });
        gsap.set(".atmo-articles", { opacity: 1 });
        return;
      }

      // --- Parallax depth: layers drift at scroll-scrubbed speeds ---
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

      // III. Doctrine — section pins and holds while the statement lights up
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

      // V. Correspondence — section pins and holds while the heading
      //    highlights word by word, then releases.
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
        const cwords = n.querySelectorAll(".corr-word");
        gsap.set(cwords, { color: DIM });
        gsap.to(cwords, {
          color: GOLD,
          ease: "none",
          stagger: 1,
          scrollTrigger: {
            trigger: n,
            start: "top top",
            end: "+=110%",
            scrub: true,
            pin: true,
          },
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

    return () => ctx.revert();
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
          <div
            data-depth="14"
            className="pointer-events-none absolute -left-20 top-10 h-[70vmin] w-[70vmin] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(120,70,160,0.28) 0%, rgba(5,5,5,0) 70%)" }}
          />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="8" />
          <div
            data-sweep
            className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen"
            style={{ background: "linear-gradient(90deg, transparent, rgba(180,140,70,0.10), transparent)" }}
          />

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[0.85fr_1fr]">
            <div className="relative mx-auto w-full max-w-xs">
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
              <div className="f-line rule-luxe my-8 max-w-[8rem]" />
              <p className="f-line max-w-md text-lg leading-relaxed text-white/65">
                &ldquo;I guide individuals and families to protect their assets,
                minimize liabilities, and secure generational wealth through
                private trusts and lawful strategies.&rdquo;
              </p>
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
          <div data-depth="16" className="pointer-events-none absolute left-1/2 top-0 h-[55vmin] w-[85vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(176,120,42,0.3) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="8" />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-2/3 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(200,150,70,0.12), transparent)" }} />

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
              {challenges.map((c) => (
                <div key={c.tier} className="c-card card flex flex-col rounded-2xl border border-white/10 bg-white/[0.025] px-8 py-10 text-left backdrop-blur-sm">
                  <span className="font-serif text-5xl text-gold-gradient">{c.tier}</span>
                  <h3 className="mt-4 font-serif text-xl text-white">{c.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gold-bright">{c.dates}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{c.blurb}</p>
                  <a href={c.href} {...ext} className="btn-lux btn-lux-sm mt-6 self-start">Secure My Spot</a>
                </div>
              ))}
            </div>
            <a href={links.events} {...ext} className="c-card mt-12 inline-block text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:text-white">
              See all upcoming events →
            </a>
          </div>
        </section>

        {/* III. The Doctrine */}
        <section
          data-scene="services"
          id="services"
          className="scene relative flex min-h-screen items-center overflow-hidden py-28 text-center"
        >
          <div data-depth="14" className="pointer-events-none absolute left-1/2 top-1/2 h-[75vmin] w-[75vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(58,58,128,0.32) 0%, rgba(5,5,5,0) 66%)" }} />
          <div data-sweep className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 mix-blend-screen" style={{ background: "linear-gradient(90deg, transparent, rgba(120,120,200,0.10), transparent)" }} />

          <div className="relative mx-auto max-w-5xl px-6">
            <p className="s-fade mb-6 text-xs uppercase tracking-luxe text-gold/70">III · The Doctrine</p>
            <h2 className="mx-auto max-w-3xl font-serif text-3xl leading-[1.14] text-white sm:text-5xl">
              {"Education, mentorship, and strategic guidance for those seeking mastery in equity, law, commerce, and private wealth."
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
        </section>

        {/* IV. The Charter */}
        <section
          data-scene="articles"
          className="scene relative overflow-hidden border-t border-white/5 py-28"
        >
          <div data-depth="12" className="pointer-events-none absolute left-1/2 top-0 h-[70vmin] w-[95vmin] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(108,60,150,0.26) 0%, rgba(5,5,5,0) 68%)" }} />
          <div className="hall-lines pointer-events-none absolute inset-0" data-depth="7" />
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
          className="scene relative flex min-h-screen items-center overflow-hidden py-24 text-center"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(180,132,52,0.26) 0%, rgba(5,5,5,0) 68%)" }} />

          <div className="relative mx-auto max-w-3xl px-6">
            <p className="n-line mb-6 text-xs uppercase tracking-luxe text-gold/70">V · The Correspondence</p>
            <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-[1.14] text-white sm:text-5xl">
              {"Equity, law, and private wealth — straight to your inbox."
                .split(" ")
                .map((w, i) => (
                  <span key={i} className="corr-word">
                    {w}{" "}
                  </span>
                ))}
            </h2>
            <a href={links.newsletter} {...ext} className="n-line btn-lux mt-10">
              Join the Newsletter
              <span aria-hidden>→</span>
            </a>
          </div>
        </section>

        {/* VI. The Seal */}
        <section
          data-scene="final"
          className="scene relative flex min-h-screen items-center overflow-hidden border-t border-white/5 py-32 text-center"
        >
          <div data-depth="10" className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(120,70,160,0.26) 0%, rgba(5,5,5,0) 66%)" }} />

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
