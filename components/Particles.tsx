"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient gold dust for the scrolling homepage — a faint, slow-drifting mote
 * field that gives the dark sections atmosphere and depth (the DOM echo of the
 * 3D chamber's dust). Purely decorative, behind everything, pointer-events off.
 * Canvas-based so it stays cheap; paused entirely for reduced-motion.
 */
export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Scale count to screen area so big monitors aren't sparse, phones aren't busy.
    const count = Math.min(70, Math.max(28, Math.round((w * h) / 34000)));
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.5, 2.0),
      // slow upward drift + gentle sideways sway
      vy: rand(-0.16, -0.04),
      sway: rand(0.0006, 0.0018),
      phase: Math.random() * Math.PI * 2,
      a: rand(0.25, 0.75),
    }));

    let raf = 0;
    let t = 0;
    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y += d.vy;
        const x = d.x + Math.sin(t * d.sway + d.phase) * 12;
        if (d.y < -4) {
          d.y = h + 4;
          d.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231, 196, 119, ${d.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 mix-blend-screen"
    />
  );
}
