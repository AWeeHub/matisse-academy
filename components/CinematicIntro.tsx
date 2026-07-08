"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intro } from "@/lib/motion";
import Homepage from "@/components/Homepage";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicIntro() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const heroLogo = q(".hero-logo")[0] as HTMLElement;
      const stage = q(".stage")[0] as HTMLElement;
      const glow = q(".ambient-glow")[0] as HTMLElement;
      const cue = q(".scroll-cue")[0] as HTMLElement;
      const navLogo = q(".nav-logo")[0] as HTMLElement;
      const reveals = q(".reveal-hidden") as HTMLElement[];

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Prime the reveal targets (transform-only + opacity).
      gsap.set(reveals, { opacity: 0, y: intro.reveal.yFromPx });
      gsap.set(navLogo, { opacity: 0 });

      if (prefersReduced) {
        // No motion: present the finished state immediately, no dead scroll.
        gsap.set(".pin-wrap", { height: "100vh" });
        gsap.set(reveals, { opacity: 1, y: 0 });
        gsap.set(navLogo, { opacity: 1 });
        gsap.set(heroLogo, { opacity: 0 });
        gsap.set(cue, { opacity: 0 });
        return;
      }

      // --- Idle loops (before / during the very start of scroll) ---
      gsap.to(heroLogo, {
        scale: intro.breathe.scaleTo,
        duration: intro.breathe.durationSec,
        ease: intro.breathe.ease,
        repeat: -1,
        yoyo: true,
      });
      gsap.to(heroLogo, {
        yPercent: -(intro.float.yPx / 6),
        duration: intro.float.durationSec,
        ease: intro.float.ease,
        repeat: -1,
        yoyo: true,
      });
      gsap.fromTo(
        glow,
        { opacity: intro.glow.opacityFrom },
        {
          opacity: intro.glow.opacityTo,
          duration: intro.glow.durationSec,
          ease: intro.glow.ease,
          repeat: -1,
          yoyo: true,
        }
      );
      gsap.to(cue, {
        y: intro.cue.bounceYPx,
        duration: intro.cue.durationSec,
        ease: intro.cue.ease,
        repeat: -1,
        yoyo: true,
      });

      // --- Scroll-driven master timeline (scrubbed, pinned) ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: intro.scroll.scrub,
        },
      });

      // Camera pull-back (subtle stage scale-down).
      tl.to(
        stage,
        { scale: intro.scroll.stage.scaleTo, ease: "none" },
        0
      );

      // Hero logo scales down + travels to the permanent nav slot.
      tl.to(
        heroLogo,
        {
          scale: intro.scroll.logo.scaleTo,
          x: () => intro.scroll.logo.xToVw * window.innerWidth,
          y: () => intro.scroll.logo.yToVh * window.innerHeight,
          ease: "power2.inOut",
        },
        0
      );

      // Scroll cue fades out almost immediately.
      tl.to(
        cue,
        { opacity: 0, ease: "none" },
        0
      ).to(
        cue,
        { opacity: 0, duration: intro.cue.hideAtProgress },
        0
      );

      // Progressive reveal of the homepage layers.
      tl.to(
        reveals,
        {
          opacity: 1,
          y: 0,
          ease: intro.reveal.ease,
          stagger: intro.reveal.staggerSec,
          duration: intro.reveal.durationSec,
        },
        intro.reveal.startAt
      );

      // Crossfade: hero logo hands off to the fixed nav logo at the end.
      tl.to(navLogo, { opacity: 1, ease: "none" }, 0.82);
      tl.to(heroLogo, { opacity: 0, ease: "none" }, 0.86);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      {/* Persistent navigation. Contents fade in during the transition. */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="nav-logo flex items-center gap-3">
          <Image
            src="/logo-3d.png"
            alt="Matisse Academy"
            width={120}
            height={120}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="reveal-hidden hidden font-serif text-lg tracking-wide text-gold-gradient sm:block">
            Matisse Academy
          </span>
        </div>
        <nav className="reveal-hidden hidden items-center gap-9 text-xs uppercase tracking-luxe text-white/60 md:flex">
          <a className="transition-colors hover:text-white" href="#program">
            Program
          </a>
          <a className="transition-colors hover:text-white" href="#philosophy">
            Philosophy
          </a>
          <a className="transition-colors hover:text-white" href="#admissions">
            Admissions
          </a>
        </nav>
        <a
          href="#admissions"
          className="reveal-hidden rounded-full border border-gold/40 px-5 py-2 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
        >
          Enquire
        </a>
      </header>

      {/* The pinned intro stage. Height drives the scroll duration; the stage
          itself is sticky so it releases straight into the homepage. */}
      <section
        className="pin-wrap relative"
        style={{ height: `${intro.scroll.pinWrapVh}vh` }}
      >
        <div className="stage sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Ambient cinematic glow behind the logo. */}
          <div
            className="ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(120,70,160,0.45) 0%, rgba(160,120,40,0.18) 38%, rgba(5,5,5,0) 70%)",
              filter: "blur(10px)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, rgba(20,14,28,0.6) 0%, rgba(5,5,5,0.95) 70%, #050505 100%)",
            }}
          />

          {/* The hero 3D logo. */}
          <div className="hero-logo relative z-10 will-change-transform">
            <Image
              src="/logo-3d.png"
              alt="Matisse Academy"
              width={760}
              height={760}
              priority
              className="h-[40vh] max-h-[520px] w-auto object-contain drop-shadow-[0_0_70px_rgba(120,70,160,0.35)]"
            />
          </div>

          {/* Homepage-hero copy — revealed as the logo transitions. */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <p className="reveal-hidden mb-5 text-xs uppercase tracking-luxe text-gold/80">
              Est. Excellence
            </p>
            <h1 className="reveal-hidden max-w-4xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl md:text-7xl">
              Where potential is
              <span className="block text-gold-gradient">refined into mastery</span>
            </h1>
            <p className="reveal-hidden mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              An exclusive academy devoted to transformation, discipline, and
              enduring excellence.
            </p>
            <a
              href="#admissions"
              className="reveal-hidden pointer-events-auto mt-10 rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-luxe text-black transition-transform hover:scale-[1.03]"
            >
              Begin Your Application
            </a>
          </div>

          {/* Scroll affordance. */}
          <div className="scroll-cue absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
            <span className="text-xl leading-none">↓</span>
            <span className="text-[0.65rem] uppercase tracking-luxe">
              Scroll to Begin
            </span>
          </div>
        </div>
      </section>

      {/* The rest of the homepage, revealed beneath the intro. */}
      <Homepage />
    </div>
  );
}
