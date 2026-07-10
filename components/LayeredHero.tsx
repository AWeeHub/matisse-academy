"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links } from "@/lib/links";

gsap.registerPlugin(ScrollTrigger);

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const nav = ["About", "Programs", "Events", "Inside the Academy", "Success Stories", "Contact"];

const features = [
  {
    title: "World-Class Education",
    body: "Curated programs designed by industry leaders.",
    icon: <path d="M4 19V7l8-3 8 3v12M4 19h16M4 19l8-3 8 3M8 11h.01M12 11h.01M16 11h.01" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Strategic Mentorship",
    body: "Learn from proven experts and thought leaders.",
    icon: <path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4L12 3zM6 18h12M8 21h8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Exclusive Network",
    body: "Connect with high-achievers and future leaders.",
    icon: <path d="M12 3l2.2 4.2H19l-4 3 1.6 4.8L12 12.6 7.4 15l1.6-4.8-4-3h4.8L12 3zM5 20h14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Lasting Legacy",
    body: "Build influence. Create impact. Leave a legacy.",
    icon: <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 13l-1.5 8L12 18l4.5 3L15 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const socials = [
  { label: "IG", href: "https://instagram.com/amyr_law" },
  { label: "LI", href: "https://matisseacademy.com" },
  { label: "FB", href: "https://matisseacademy.com" },
];

/**
 * Immersive-reveal hero. One cinematic image opens from a centred frame to
 * full-bleed (clip-path wipe + scale settle) as the page loads, while the
 * headline masks up line by line — the "pull you in" beat. Deliberately a
 * SINGLE clean image (no montage seams). Header, feature row + chrome kept.
 */
export default function LayeredHero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(q(".reveal-frame"), { clipPath: "inset(0% round 0px)" });
        gsap.set(q(".hero-img"), { scale: 1 });
        gsap.set(q(".mask-inner, .fade-in"), { yPercent: 0, opacity: 1, clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });

      // 1. The frame wipes open from a centred window to full-bleed, image
      //    settling from an over-scale — the immersive reveal.
      tl.fromTo(
        q(".reveal-frame"),
        { clipPath: "inset(30% 26% round 26px)" },
        { clipPath: "inset(0% 0% round 0px)", duration: 1.5, ease: "power4.inOut" }
      ).fromTo(
        q(".hero-img"),
        { scale: 1.35 },
        { scale: 1, duration: 1.8, ease: "power3.out" },
        0
      );

      // 2. Headline lines mask up out of their clip.
      tl.fromTo(
        q(".mask-inner"),
        { yPercent: 115 },
        { yPercent: 0, duration: 1.0, ease: "power4.out", stagger: 0.12 },
        0.7
      );

      // 3. Supporting chrome fades in.
      tl.fromTo(
        q(".fade-in"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
        1.1
      );

      // Gentle scroll parallax on the settled image (single plane, no seams).
      gsap.to(q(".hero-img"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative bg-void">
      <section className="relative h-screen w-full overflow-hidden">
        {/* ---------- IMMERSIVE IMAGE ---------- */}
        <div className="reveal-frame absolute inset-0 overflow-hidden">
          <div className="hero-img absolute inset-0 will-change-transform">
            <Image src="/hero/scales.jpg" alt="Scales of justice" fill priority sizes="100vw" className="object-cover object-center" />
          </div>
          {/* Grade: darken + push gold/ink so the photo reads on-brand. */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 100% at 68% 45%, rgba(5,5,5,0) 30%, rgba(10,6,16,0.55) 100%)" }} />
          <div className="absolute inset-0 mix-blend-color opacity-40" style={{ background: "linear-gradient(120deg, #3a2a60 0%, #b0782a 100%)" }} />
        </div>

        {/* ---------- LEGIBILITY SCRIMS ---------- */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, #050505 0%, rgba(5,5,5,0.86) 26%, rgba(5,5,5,0.4) 52%, rgba(5,5,5,0) 76%)" }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(0deg, #050505 4%, rgba(5,5,5,0) 26%, rgba(5,5,5,0) 80%, rgba(5,5,5,0.7) 100%)" }} />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* ---------- HEADER ---------- */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-8 py-6 md:px-14">
          <div className="fade-in flex items-center gap-3">
            <Image src="/logo-mark.png" alt="Matisse Academy" width={150} height={100} className="h-10 w-auto object-contain" />
            <span className="font-serif text-lg tracking-wide text-gold-gradient">Matisse Academy</span>
          </div>
          <nav className="fade-in hidden items-center gap-8 text-[0.72rem] uppercase tracking-luxe text-white/60 lg:flex">
            {nav.map((n) => (
              <a key={n} className="transition-colors hover:text-white" href="#">{n}</a>
            ))}
          </nav>
          <a href={links.challenge3Day} {...ext} className="fade-in btn-lux btn-lux-sm">
            Secure My Spot <span aria-hidden>→</span>
          </a>
        </header>

        {/* ---------- SOCIAL RAIL ---------- */}
        <div className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex md:left-14">
          <div className="fade-in h-16 w-px bg-white/15" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} {...ext} className="fade-in text-[0.62rem] uppercase tracking-luxe text-white/45 transition-colors hover:text-gold-bright">{s.label}</a>
          ))}
          <div className="fade-in h-16 w-px bg-white/15" />
        </div>

        {/* ---------- CONTENT (left) ---------- */}
        <div className="relative z-20 flex h-full items-center">
          <div className="max-w-2xl px-8 md:pl-28 md:pr-6">
            <p className="fade-in mb-6 text-xs uppercase tracking-luxe text-gold/70">III · The Doctrine</p>
            <h1 className="font-serif text-5xl leading-[1.02] text-white sm:text-6xl md:text-7xl">
              <span className="block overflow-hidden py-[0.06em]"><span className="mask-inner block">A Legacy of <span className="text-gold-gradient">Excellence.</span></span></span>
              <span className="block overflow-hidden py-[0.06em]"><span className="mask-inner block">A Future of <span className="text-gold-gradient">Impact.</span></span></span>
            </h1>
            <p className="fade-in mt-7 max-w-md text-base leading-relaxed text-white/60">
              Education, mentorship, and strategic guidance for those seeking mastery in equity, law, commerce, and private wealth.
            </p>
            <a href={links.services} {...ext} className="fade-in btn-lux mt-10">Explore Our Services <span aria-hidden>→</span></a>
          </div>
        </div>

        {/* ---------- PAGER (right) ---------- */}
        <div className="absolute right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex">
          {["01", "02", "03", "04", "05"].map((n, i) => (
            <span key={n} className={`fade-in text-[0.66rem] tracking-luxe ${i === 0 ? "text-gold-bright" : "text-white/35"}`}>{n}</span>
          ))}
        </div>

        {/* ---------- SCROLL CUE ---------- */}
        <div className="fade-in absolute bottom-8 left-8 z-30 flex flex-col items-start gap-2 text-white/45 md:left-14">
          <span className="text-[0.62rem] uppercase tracking-luxe leading-tight">Scroll<br />to Discover</span>
        </div>

        {/* ---------- FEATURE ROW ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/8 bg-gradient-to-t from-void/95 to-transparent">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-6 px-8 py-7 md:grid-cols-4 md:px-14">
            {features.map((f) => (
              <div key={f.title} className="fade-in flex items-start gap-3.5">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-7 w-7 shrink-0 text-gold-bright" aria-hidden>{f.icon}</svg>
                <div>
                  <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/90">{f.title}</h3>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-white/45">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacer so scroll parallax has room in the preview. */}
      <section className="flex h-screen items-center justify-center">
        <p className="px-6 text-center font-serif text-2xl italic text-white/30">
          (Immersive-reveal hero preview — 3D slider section comes next.)
        </p>
      </section>
    </div>
  );
}
