"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic parallax hero for the About page. The "Black Sheep Deck" key art
 * (skyline + American flag + Amyr + gold dust) is the deep background plane;
 * a live gold-particle canvas drifts as its own middle plane; the headline /
 * CTA ride as the front plane. Each layer is offset by scroll at a different
 * speed via transform-only translate3d (no width/height/top thrash), so the
 * scene gains real depth as you move down.
 */
export default function AboutHero({
  ctaHref,
  ext,
}: {
  ctaHref: string;
  ext: { target: string; rel: string };
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax only (no cursor follow — the scene stays steady when
  // the mouse moves). Each plane is offset by its own depth factor relative to
  // how far the hero has scrolled past the viewport top.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const stage = stageRef.current;
        if (!stage) return;
        const y = Math.max(0, -stage.getBoundingClientRect().top);
        if (bgRef.current)
          bgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(1.18)`;
        if (glowRef.current)
          glowRef.current.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
        if (canvasRef.current)
          canvasRef.current.style.transform = `translate3d(0, ${y * 0.5}px, 0)`;
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * 0.42}px, 0)`;
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 520));
        }
        if (scrimRef.current)
          scrimRef.current.style.opacity = String(Math.min(1, 0.35 + y / 900));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Gold dust particle field — its own drifting plane over the key art.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Mote = { x: number; y: number; r: number; vy: number; vx: number; a: number; tw: number };
    let motes: Mote[] = [];

    const seed = () => {
      const count = Math.round((w * h) / 26000); // density scales with area
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.4,
        vy: -(Math.random() * 0.28 + 0.06),
        vx: (Math.random() - 0.5) * 0.14,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        m.tw += 0.03;
        if (m.y < -4) { m.y = h + 4; m.x = Math.random() * w; }
        if (m.x < -4) m.x = w + 4;
        if (m.x > w + 4) m.x = -4;
        const flick = 0.6 + Math.sin(m.tw) * 0.4;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,196,119,${(m.a * flick).toFixed(3)})`;
        ctx.shadowColor = "rgba(231,196,119,0.9)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) raf = requestAnimationFrame(draw);
    else { // static sprinkle for reduced-motion
      for (const m of motes) {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231,196,119,${m.a})`;
        ctx.fill();
      }
    }
    return () => {
      window.removeEventListener("resize", resize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="relative min-h-[92vh] w-full overflow-hidden"
    >
      {/* Deepest plane — the key art. Pre-scaled so parallax never bares an edge. */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url('/about-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: "scale(1.18)",
        }}
      />

      {/* Warm depth glow rising from the skyline — mid plane. */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          background:
            "radial-gradient(60% 50% at 32% 62%, rgba(176,120,42,0.28) 0%, rgba(5,5,5,0) 62%)",
        }}
      />

      {/* Gold dust plane. */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 will-change-transform" />

      {/* Slow golden light sweep. */}
      <div className="hero-sweep pointer-events-none absolute inset-0" />

      {/* Cinematic vignette — pulls focus to the center subject. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 200px 40px rgba(0,0,0,0.75)" }}
      />

      {/* Legibility scrim — darkens as you scroll into the hero. */}
      <div
        ref={scrimRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 38%, rgba(5,5,5,0) 62%), linear-gradient(0deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 45%)",
          opacity: 0.35,
        }}
      />

      {/* Front plane — headline + CTA. */}
      <div className="relative z-10 flex min-h-[92vh] items-center py-28 md:py-0">
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-6xl px-6 will-change-transform md:px-12"
        >
          <div className="max-w-xl">
            <p className="mb-3.5 text-xs uppercase tracking-luxe text-gold/80">
              About the Founder
            </p>
            <div className="rule-luxe mb-7 max-w-[3.5rem]" />
            <h1 className="font-serif text-4xl leading-[1.04] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.7)] sm:text-6xl md:text-7xl">
              <span className="block">Meet</span>
              <span className="block text-gold-gradient">Amyr Samah El.</span>
            </h1>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/75 drop-shadow-[0_1px_10px_rgba(0,0,0,0.8)]">
              A strategist, educator, and advocate for equity and generational
              wealth. Amyr built his practice on the belief that lawful knowledge
              is the greatest form of protection. His mission is to teach what
              protects, empower what builds, and secure what lasts.
            </p>
            <blockquote className="mt-7 max-w-md border-l-2 border-gold/50 pl-5 font-serif text-[0.95rem] italic leading-relaxed text-white/70">
              &ldquo;I guide individuals and families to protect their assets,
              minimize liabilities, and secure generational wealth through private
              trusts and lawful strategies.&rdquo;
            </blockquote>
            <a href={ctaHref} {...ext} className="btn-lux mt-9">
              Work With Amyr
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.6rem] uppercase tracking-luxe text-white/40">
        Scroll
      </div>

      {/* Seam into the page below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-void" />
    </section>
  );
}
