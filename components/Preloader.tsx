"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

/**
 * Branded entrance: the seal resolves in over a gold progress line, then the
 * whole panel lifts like a curtain to reveal the page — turning the load into
 * a crafted opening beat (and masking the WebGL chamber's init). Scroll is
 * locked while it plays. Reduced-motion skips straight to the site.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let released = false;
    const unlock = () => {
      if (released) return;
      released = true;
      document.body.style.overflow = "";
      setDone(true);
      // Cue the hero to perform its entrance now that the curtain is lifting.
      window.dispatchEvent(new Event("ma:intro-start"));
    };

    if (reduced) {
      unlock();
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Failsafe: setTimeout still fires when the tab is backgrounded and rAF
    // (GSAP's ticker) is paused, so the page can never stay locked behind a
    // stalled intro. Comfortably longer than the ~3.3s timeline.
    const failsafe = window.setTimeout(unlock, 4200);

    const q = (s: string) => el.querySelector(s);
    const tl = gsap.timeline({ onComplete: () => { window.clearTimeout(failsafe); unlock(); } });
    tl.fromTo(
      q(".pl-seal"),
      { opacity: 0, scale: 0.82, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.0, ease: "power3.out" }
    )
      .fromTo(
        q(".pl-line"),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        q(".pl-bar-fill"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.05, ease: "power1.inOut" },
        "-=0.55"
      )
      .to([q(".pl-seal"), q(".pl-line"), q(".pl-bar")], {
        opacity: 0,
        y: -16,
        duration: 0.5,
        ease: "power2.in",
      }, "+=0.15")
      .to(el, { yPercent: -100, duration: 0.95, ease: "power4.inOut" }, "-=0.1");

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(120,70,160,0.35) 0%, rgba(160,120,40,0.12) 40%, rgba(5,5,5,0) 70%)",
        }}
      />
      <div className="pl-seal relative">
        <Image
          src="/logo-mark.png"
          alt="Matisse Academy"
          width={320}
          height={213}
          priority
          className="h-28 w-auto object-contain drop-shadow-[0_0_50px_rgba(120,70,160,0.45)]"
        />
      </div>
      <p className="pl-line relative mt-8 text-[0.7rem] uppercase tracking-[0.4em] text-gold/70">
        Notice is the heart of equity
      </p>
      <div className="pl-bar relative mt-7 h-px w-40 overflow-hidden bg-white/10">
        <div className="pl-bar-fill h-full w-full origin-left bg-gradient-to-r from-gold-bright via-gold to-gold-bright" />
      </div>
    </div>
  );
}
