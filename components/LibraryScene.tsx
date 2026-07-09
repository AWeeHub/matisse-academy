"use client";

import { useEffect, useMemo, useRef } from "react";
import { links } from "@/lib/links";

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * "The Library of Equity" — a layered 2.5-D storytelling scene.
 *
 * Depth is built from stacked layers, each tagged with:
 *   data-depth  → scroll parallax (handled by Homepage's ScrollTrigger loop,
 *                 which writes `transform`)
 *   data-mx     → pointer parallax factor (this component writes the
 *                 independent `translate` prop, so the two compose cleanly)
 *
 * Back → front: marble hall + shelves, god-ray light, dust, gavel + parchment
 * (mid), brass scales + antique book (fore), editorial copy on top.
 */
export default function LibraryScene() {
  const root = useRef<HTMLDivElement>(null);

  // Pointer parallax — lerped for a smooth, weighted feel.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = Array.from(
      el.querySelectorAll<HTMLElement>("[data-mx]")
    ).map((n) => ({ n, f: parseFloat(n.dataset.mx || "0") }));

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1..1
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      for (const { n, f } of layers) {
        n.style.translate = `${(-cx * f).toFixed(2)}px ${(-cy * f * 0.6).toFixed(2)}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Deterministic dust field (no hydration mismatch).
  const dust = useMemo(() => {
    let s = 7;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: 46 }, () => ({
      x: rnd() * 100,
      y: rnd() * 100,
      sz: 1 + rnd() * 2.5,
      o: 0.15 + rnd() * 0.5,
      d: 6 + rnd() * 10,
      dl: -rnd() * 10,
    }));
  }, []);

  return (
    <section
      ref={root}
      className="scene library relative flex min-h-screen items-center overflow-hidden border-t border-white/5"
    >
      {/* ————— BACKGROUND: marble hall, columns, shelves into darkness ————— */}
      <div
        data-depth="6"
        data-mx="8"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, #171021 0%, #0a0713 45%, #050505 100%)",
        }}
      />
      {/* Receding bookshelves — faint horizontal rows fading down the hall. */}
      <div
        data-depth="8"
        data-mx="10"
        className="pointer-events-none absolute inset-x-0 top-0 h-[62%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 26px, rgba(150,110,60,0.10) 26px 27px), repeating-linear-gradient(90deg, transparent 0 120px, rgba(120,90,50,0.08) 120px 122px)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 20%, #000 0%, transparent 70%)",
          maskImage:
            "radial-gradient(120% 90% at 50% 20%, #000 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />
      {/* Marble columns, symmetric, receding. */}
      <div
        data-depth="12"
        data-mx="18"
        className="pointer-events-none absolute inset-0 flex items-start justify-between px-[4vw]"
      >
        {[0, 1, 2, 3].map((i) => (
          <Column key={i} side={i < 2 ? "l" : "r"} />
        ))}
      </div>

      {/* ————— VOLUMETRIC LIGHT: warm god-rays ————— */}
      <div
        data-depth="4"
        data-mx="5"
        className="light-beams pointer-events-none absolute inset-0 mix-blend-screen"
      >
        <div
          className="absolute -top-[20%] left-[38%] h-[150%] w-[16%] -rotate-[18deg]"
          style={{
            background:
              "linear-gradient(180deg, rgba(233,197,120,0.30), rgba(233,197,120,0) 78%)",
            filter: "blur(6px)",
          }}
        />
        <div
          className="absolute -top-[20%] left-[52%] h-[150%] w-[10%] -rotate-[14deg]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,220,150,0.22), rgba(255,220,150,0) 74%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute -top-[20%] left-[60%] h-[150%] w-[20%] -rotate-[20deg]"
          style={{
            background:
              "linear-gradient(180deg, rgba(200,160,90,0.16), rgba(200,160,90,0) 80%)",
            filter: "blur(10px)",
          }}
        />
      </div>
      {/* Warm floor pool. */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[38%] w-[70%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(214,166,63,0.20) 0%, rgba(5,5,5,0) 72%)",
        }}
      />

      {/* ————— DUST ————— */}
      <div data-depth="5" data-mx="14" className="pointer-events-none absolute inset-0">
        {dust.map((p, i) => (
          <span
            key={i}
            className="dust absolute rounded-full bg-[#f2d79a]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.sz,
              height: p.sz,
              opacity: p.o,
              boxShadow: "0 0 6px rgba(242,215,154,0.8)",
              animationDuration: `${p.d}s`,
              animationDelay: `${p.dl}s`,
            }}
          />
        ))}
      </div>

      {/* ————— MIDGROUND: gavel (left) + parchment & seal (right) ————— */}
      <div
        data-depth="18"
        data-mx="30"
        className="pointer-events-none absolute bottom-[16%] left-[9%] hidden w-[15vw] max-w-[220px] md:block"
      >
        <Gavel />
      </div>
      <div
        data-depth="16"
        data-mx="26"
        className="pointer-events-none absolute bottom-[15%] right-[9%] hidden w-[15vw] max-w-[230px] md:block"
      >
        <Parchment />
      </div>

      {/* ————— FOREGROUND: brass scales (left) + antique book (right) ————— */}
      <div
        data-depth="30"
        data-mx="52"
        className="pointer-events-none absolute -bottom-[4%] left-[3%] w-[30vw] max-w-[420px]"
      >
        <Scales />
      </div>
      <div
        data-depth="34"
        data-mx="60"
        className="pointer-events-none absolute -bottom-[3%] right-[4%] hidden w-[24vw] max-w-[360px] sm:block"
      >
        <LawBook />
      </div>

      {/* Edge vignette for depth. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 45%, rgba(5,5,5,0) 52%, rgba(5,5,5,0.9) 100%)",
        }}
      />

      {/* ————— EDITORIAL COPY ————— */}
      <div
        data-depth="10"
        data-mx="-12"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 text-center"
      >
        <p className="mb-6 text-[0.7rem] uppercase tracking-[0.4em] text-gold/70">
          The Library of Equity
        </p>
        <h2 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.04] text-white sm:text-6xl">
          Where the letter of the law
          <span className="block text-gold-gradient">becomes leverage.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
          Step into the archive of private trust and lawful strategy — the
          instruments, the doctrine, and the quiet edge of those who read the
          fine print.
        </p>
        <a href={links.services} {...ext} className="btn-lux pointer-events-auto mt-10">
          Enter the Archive
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}

/* ————————————————— SVG material props ————————————————— */

function Column({ side }: { side: "l" | "r" }) {
  return (
    <svg viewBox="0 0 80 600" className="h-[78%] w-[8vw] max-w-[110px] opacity-70" style={{ transform: side === "r" ? "scaleX(-1)" : undefined }} aria-hidden>
      <defs>
        <linearGradient id="marble" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2a2036" />
          <stop offset="0.5" stopColor="#3d2f4f" />
          <stop offset="1" stopColor="#1a1226" />
        </linearGradient>
        <linearGradient id="colgold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a6a2e" />
          <stop offset="0.5" stopColor="#e9c578" />
          <stop offset="1" stopColor="#8a6a2e" />
        </linearGradient>
      </defs>
      {/* capital */}
      <rect x="6" y="20" width="68" height="20" rx="3" fill="url(#colgold)" />
      <rect x="12" y="40" width="56" height="10" fill="#241a30" />
      {/* fluted shaft */}
      <rect x="16" y="50" width="48" height="500" fill="url(#marble)" />
      {[22, 30, 38, 46, 54].map((x) => (
        <line key={x} x1={x} y1="52" x2={x} y2="548" stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" />
      ))}
      {/* base */}
      <rect x="10" y="550" width="60" height="14" rx="3" fill="url(#colgold)" />
    </svg>
  );
}

function Scales() {
  return (
    <svg viewBox="0 0 300 320" className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" aria-hidden>
      <defs>
        <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d488" />
          <stop offset="0.45" stopColor="#d4a63f" />
          <stop offset="1" stopColor="#8a6521" />
        </linearGradient>
      </defs>
      <g stroke="url(#brass)" fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* base + post */}
        <path d="M110 300 h80 M150 300 V70" strokeWidth="6" />
        <ellipse cx="150" cy="304" rx="52" ry="10" fill="#3a2c12" stroke="none" />
        {/* finial */}
        <circle cx="150" cy="60" r="9" fill="url(#brass)" stroke="none" />
        {/* beam */}
        <path d="M40 84 L260 84" strokeWidth="5" />
        <circle cx="150" cy="84" r="6" fill="url(#brass)" stroke="none" />
        {/* chains */}
        <path d="M40 84 L18 150 M40 84 L62 150 M260 84 L238 150 M260 84 L282 150" strokeWidth="2" />
        {/* pans */}
        <path d="M8 150 a32 22 0 0 0 64 0 Z" fill="url(#brass)" stroke="none" opacity="0.92" />
        <path d="M228 150 a32 22 0 0 0 64 0 Z" fill="url(#brass)" stroke="none" opacity="0.92" />
        <path d="M8 150 h64 M228 150 h64" strokeWidth="2" />
      </g>
    </svg>
  );
}

function Gavel() {
  return (
    <svg viewBox="0 0 260 200" className="h-auto w-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)]" aria-hidden>
      <defs>
        <linearGradient id="gav" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9c578" />
          <stop offset="1" stopColor="#9a7328" />
        </linearGradient>
      </defs>
      <g transform="rotate(-24 130 90)">
        {/* head */}
        <rect x="70" y="34" width="120" height="52" rx="12" fill="url(#gav)" />
        <rect x="78" y="30" width="18" height="60" rx="5" fill="#b98f3a" />
        <rect x="164" y="30" width="18" height="60" rx="5" fill="#b98f3a" />
        {/* handle */}
        <rect x="122" y="80" width="16" height="104" rx="8" fill="url(#gav)" />
        <circle cx="130" cy="188" r="11" fill="#b98f3a" />
      </g>
      {/* sound block */}
      <rect x="150" y="168" width="96" height="16" rx="4" fill="url(#gav)" />
      <rect x="160" y="184" width="76" height="8" rx="3" fill="#6f5320" />
    </svg>
  );
}

function Parchment() {
  return (
    <svg viewBox="0 0 220 260" className="h-auto w-full drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)]" aria-hidden>
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe4c6" />
          <stop offset="1" stopColor="#cdbd94" />
        </linearGradient>
      </defs>
      <g transform="rotate(6 110 130)">
        <rect x="34" y="20" width="152" height="210" rx="4" fill="url(#paper)" />
        {[54, 72, 90, 108, 126, 144, 162].map((y) => (
          <line key={y} x1="52" y1={y} x2="168" y2={y} stroke="rgba(60,40,20,0.35)" strokeWidth="3" strokeLinecap="round" />
        ))}
        <line x1="52" y1="180" x2="120" y2="180" stroke="rgba(60,40,20,0.35)" strokeWidth="3" strokeLinecap="round" />
        {/* wax seal */}
        <circle cx="150" cy="200" r="22" fill="#7a2f57" />
        <circle cx="150" cy="200" r="22" fill="none" stroke="#e9c578" strokeWidth="2" />
        <text x="150" y="206" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fill="#e9c578">MA</text>
        <path d="M150 222 l-8 22 8 -6 8 6 z" fill="#7a2f57" />
      </g>
    </svg>
  );
}

function LawBook() {
  return (
    <svg viewBox="0 0 340 220" className="h-auto w-full drop-shadow-[0_22px_40px_rgba(0,0,0,0.6)]" aria-hidden>
      <defs>
        <linearGradient id="cover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1f52" />
          <stop offset="1" stopColor="#1c0f2b" />
        </linearGradient>
        <linearGradient id="pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe6cf" />
          <stop offset="1" stopColor="#c9bd9a" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9c578" />
          <stop offset="1" stopColor="#9a7328" />
        </linearGradient>
      </defs>
      {/* open book two-page spread in perspective */}
      <path d="M20 70 L170 40 L170 176 L20 200 Z" fill="url(#pages)" />
      <path d="M320 70 L170 40 L170 176 L320 200 Z" fill="url(#pages)" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={40 + i * 22} y1={78 - i * 4} x2={40 + i * 22} y2={188 - i * 3} stroke="rgba(90,70,40,0.25)" strokeWidth="2" />
          <line x1={300 - i * 22} y1={78 - i * 4} x2={300 - i * 22} y2={188 - i * 3} stroke="rgba(90,70,40,0.25)" strokeWidth="2" />
        </g>
      ))}
      {/* spine + covers */}
      <path d="M170 40 L170 176 L164 178 L164 42 Z" fill="url(#edge)" />
      <path d="M20 200 L20 214 L170 190 L170 176 Z" fill="url(#cover)" />
      <path d="M320 200 L320 214 L170 190 L170 176 Z" fill="url(#cover)" />
      {/* gold title bar */}
      <rect x="66" y="96" width="72" height="10" rx="2" fill="url(#edge)" opacity="0.85" transform="rotate(-8 100 100)" />
    </svg>
  );
}
