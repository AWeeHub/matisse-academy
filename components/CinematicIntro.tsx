"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { intro } from "@/lib/motion";
import { links } from "@/lib/links";
import Homepage from "@/components/Homepage";

const ChamberScene = dynamic(() => import("@/components/ChamberScene"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function CinematicIntro() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [use3D, setUse3D] = useState(false);

  // Decide whether to run the WebGL chamber: skip on reduced-motion, small
  // screens, and browsers without WebGL — those get the static fallback.
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const small = window.innerWidth < 768;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setUse3D(!reduced && !small && webgl);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector!;
      const heroLogo = q(".hero-logo")[0] as HTMLElement;
      const heroLogoInner = q(".hero-logo-inner")[0] as HTMLElement;
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

      // --- Idle loops. The DOM logo/glow only exist in the static fallback;
      //     in 3D mode the chamber carries the visual, so guard them. ---
      if (heroLogoInner) {
        gsap.to(heroLogoInner, {
          scale: intro.breathe.scaleTo,
          duration: intro.breathe.durationSec,
          ease: intro.breathe.ease,
          repeat: -1,
          yoyo: true,
        });
        gsap.to(heroLogoInner, {
          yPercent: -(intro.float.yPx / 6),
          duration: intro.float.durationSec,
          ease: intro.float.ease,
          repeat: -1,
          yoyo: true,
        });
      }
      if (glow) {
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
      }
      gsap.to(cue, {
        y: intro.cue.bounceYPx,
        duration: intro.cue.durationSec,
        ease: intro.cue.ease,
        repeat: -1,
        yoyo: true,
      });

      // --- Scroll-driven master timeline (scrubbed, pinned) ---
      // onUpdate feeds the WebGL chamber its 0-1 camera-journey progress.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: intro.scroll.scrub,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      // Fallback only: gently pull the flat stage back as you scroll. In 3D
      // mode the camera does the moving, so leave the canvas untouched.
      if (!use3D) {
        tl.to(stage, { scale: intro.scroll.stage.scaleTo, ease: "none" }, 0);
      }

      // Fallback only: the flat hero logo recedes and dissolves in place.
      if (heroLogo) {
        tl.to(
          heroLogo,
          { scale: intro.scroll.logo.scaleTo, ease: "power1.out" },
          0
        );
        tl.to(
          heroLogo,
          {
            opacity: 0,
            ease: "power1.in",
            duration: intro.scroll.logo.fadeDuration,
          },
          0
        );
      }

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

      // Permanent nav logo fades in as the hero logo dissolves.
      tl.to(navLogo, { opacity: 1, ease: "none" }, intro.scroll.navFadeInAt);
    }, root);

    // Front-load layout settling so the async WebGL/texture init doesn't
    // trigger a late refresh that nudges the scroll position.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(t);
      ctx.revert();
    };
  }, [use3D]);

  return (
    <div ref={root} className="grain relative">
      {/* Persistent navigation. Contents fade in during the transition. */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="nav-logo flex items-center gap-3">
          <Image
            src="/logo-mark.png"
            alt="Matisse Academy"
            width={150}
            height={100}
            priority
            className="h-10 w-auto object-contain"
          />
          <span className="reveal-hidden hidden font-serif text-lg tracking-wide text-gold-gradient sm:block">
            Matisse Academy
          </span>
        </div>
        <nav className="reveal-hidden hidden items-center gap-9 text-xs uppercase tracking-luxe text-white/60 md:flex">
          <a className="transition-colors hover:text-white" href="#challenge">
            The Challenge
          </a>
          <a className="transition-colors hover:text-white" href="#services">
            Services
          </a>
          <a className="transition-colors hover:text-white" href="#founder">
            Founder
          </a>
        </nav>
        <a
          href={links.challenge3Day}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal-hidden press rounded-full border border-gold/40 px-5 py-2 text-xs uppercase tracking-luxe text-gold-bright transition-colors hover:bg-gold/10"
        >
          Secure My Spot
        </a>
      </header>

      {/* The pinned intro stage. Height drives the scroll duration; the stage
          itself is sticky so it releases straight into the homepage. */}
      <section
        className="pin-wrap relative"
        style={{ height: `${intro.scroll.pinWrapVh}vh` }}
      >
        <div className="stage sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {use3D ? (
            <>
              {/* WebGL "Chamber of Equity" — camera flies down the hall on scroll. */}
              <div className="absolute inset-0">
                <ChamberScene progress={progress} />
              </div>
              {/* Legibility scrim so the hero copy reads over the scene:
                  a soft dark oval behind the text plus an edge vignette. */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 46% at 50% 44%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.4) 55%, rgba(5,5,5,0) 100%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(130% 100% at 50% 60%, rgba(5,5,5,0) 40%, rgba(5,5,5,0.5) 74%, rgba(5,5,5,0.9) 100%)",
                }}
              />
            </>
          ) : (
            <>
              {/* Static fallback: ambient glow + flat 3D logo. */}
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
              <div className="hero-logo relative z-10 will-change-transform">
                <div className="hero-logo-inner will-change-transform">
                  <Image
                    src="/logo-3d.png"
                    alt="Matisse Academy"
                    width={760}
                    height={760}
                    priority
                    className="h-[40vh] max-h-[520px] w-auto object-contain drop-shadow-[0_0_70px_rgba(120,70,160,0.35)]"
                  />
                </div>
              </div>
            </>
          )}

          {/* Homepage-hero copy — revealed as the logo transitions. */}
          <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
            <p className="reveal-hidden mb-5 text-xs uppercase tracking-luxe text-gold/80">
              Matisse Academy
            </p>
            <h1 className="reveal-hidden max-w-4xl font-serif text-4xl leading-[1.08] text-white sm:text-6xl md:text-7xl">
              Notice is the heart
              <span className="block text-gold-gradient">of equity</span>
            </h1>
            <p className="reveal-hidden mt-4 text-[0.7rem] uppercase tracking-[0.3em] text-gold/60">
              Matthew 4:19 · KJV 1611
            </p>
            <p className="reveal-hidden mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              Education, mentorship, and strategic guidance in equity, law,
              commerce, and private wealth — with Amyr Samah El.
            </p>
            <a
              href={links.challenge3Day}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-hidden press pointer-events-auto mt-10 rounded-full bg-gold px-8 py-3 text-xs uppercase tracking-luxe text-black"
            >
              Secure My Spot
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
