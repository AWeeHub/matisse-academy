"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { links } from "@/lib/links";
import Homepage from "@/components/Homepage";
import NavMenu from "@/components/NavMenu";
import MobileNav from "@/components/MobileNav";

/**
 * Homepage hero — a cinematic photographic hero over the law-library key art
 * (scales, gavel, the LAW tome, gold light through the arched window). The
 * headline reads at rest; a gentle scroll parallax gives the scene depth. The
 * rest of the homepage (chaptered scenes) follows beneath.
 */
export default function CinematicIntro() {
  const root = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  // Scroll-aware header: gains a blurred background once past the hero, and
  // hides on scroll-down / reappears on scroll-up so it never collides with
  // the content scrolling beneath it.
  useEffect(() => {
    const header = root.current?.querySelector(".site-header") as HTMLElement | null;
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        header.classList.toggle("is-scrolled", y > vh * 0.55);
        if (y > vh && y > lastY + 4) header.classList.add("is-hidden");
        else if (y < lastY - 4) header.classList.remove("is-hidden");
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gentle scroll parallax: the key art drifts slower than the copy, and the
  // copy fades as you scroll into the homepage. Transform-only; reduced-motion
  // leaves everything still.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (bgRef.current)
          bgRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0) scale(1.12)`;
        if (copyRef.current) {
          copyRef.current.style.transform = `translate3d(0, ${y * 0.34}px, 0)`;
          copyRef.current.style.opacity = String(Math.max(0, 1 - y / 560));
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="grain relative">
      {/* Persistent navigation. */}
      <header className="site-header fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Matisse Academy"
            width={150}
            height={100}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="hidden font-serif text-lg tracking-wide text-gold-gradient sm:block">
            Matisse Academy
          </span>
        </div>
        <NavMenu />
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <a
              href={links.challenge3Day}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lux btn-lux-sm"
            >
              Secure My Spot
            </a>
          </span>
          <MobileNav />
        </div>
      </header>

      {/* Photographic hero. */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 text-center">
        {/* Key art. */}
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            backgroundImage: "url('/home-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 42%",
            transform: "scale(1.12)",
            filter: "contrast(1.05) saturate(1.04)",
          }}
        />

        {/* Legibility scrims: a soft dark oval behind the copy + edge vignette
            + a bottom fade that melts the hero into the homepage below. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(62% 52% at 50% 46%, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.42) 52%, rgba(5,5,5,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 220px 70px rgba(0,0,0,0.7)" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />

        {/* Hero copy — reads at rest. */}
        <div
          ref={copyRef}
          className="relative z-10 flex flex-col items-center will-change-transform"
        >
          <p className="mb-5 text-xs uppercase tracking-luxe text-gold/80">
            Matisse Academy
          </p>
          <h1 className="max-w-4xl font-serif text-4xl leading-[1.08] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] sm:text-6xl md:text-7xl">
            Notice is the heart
            <span className="block text-gold-gradient">of equity</span>
          </h1>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
            Matthew 4:19 · KJV 1611
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)] sm:text-base">
            Education, mentorship, and strategic guidance in equity, law,
            commerce, and private wealth — with Amyr Samah El.
          </p>
          <a
            href={links.challenge3Day}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lux mt-10"
          >
            Secure My Spot
            <span aria-hidden>→</span>
          </a>
        </div>

      </section>

      {/* The rest of the homepage. */}
      <Homepage />
    </div>
  );
}
