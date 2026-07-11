"use client";

import { useState } from "react";

/** Video player with a gold play button and a corner "YouTube ↗" link.
 *
 *  The @amyrlaw channel currently has embedding DISABLED (YouTube Error 153),
 *  so an inline iframe only shows an error. While EMBED_ENABLED is false the
 *  poster opens the video on YouTube. The MOMENT Amyr enables "Allow embedding"
 *  (YouTube Studio → Content → edit → Show more → Allow embedding ✓), set
 *  EMBED_ENABLED = true and redeploy — the poster then plays the video inline,
 *  and the corner link still lets viewers jump to YouTube. */
export const PLACEHOLDER = "__PLACEHOLDER__";

const EMBED_ENABLED = false; // ← flip to true once YouTube embedding is on

export default function VideoEmbed({
  videoId,
  title = "Matisse Academy",
  poster,
}: {
  videoId: string;
  title?: string;
  poster?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const isPlaceholder = !videoId || videoId === PLACEHOLDER;

  const thumb =
    poster || (!isPlaceholder ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : undefined);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const posterInner = (
    <>
      {thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Not every upload has a maxres poster — fall back to hqdefault.
            const img = e.currentTarget;
            if (!img.src.includes("hqdefault")) {
              img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
            }
          }}
        />
      )}
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
      <span className="absolute left-1/2 top-1/2 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-black/40 text-gold-bright backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" aria-hidden>
          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
        </svg>
      </span>
    </>
  );

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/20 bg-white/[0.02] shadow-2xl">
      {/* Ambient gold frame glow. */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(243,205,122,0.14), 0 0 40px -12px rgba(243,205,122,0.25)",
        }}
      />

      {isPlaceholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[radial-gradient(120%_120%_at_50%_0%,rgba(120,70,160,0.12),transparent_60%)] text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold-bright">
            <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
            </svg>
          </span>
          <p className="text-[0.68rem] uppercase tracking-luxe text-gold/60">
            Video coming soon
          </p>
        </div>
      ) : EMBED_ENABLED && playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : EMBED_ENABLED ? (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {posterInner}
        </button>
      ) : (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch on YouTube: ${title}`}
          className="group absolute inset-0 block h-full w-full"
        >
          {posterInner}
        </a>
      )}

      {/* Corner link to YouTube — always available while a real video is set. */}
      {!isPlaceholder && (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[0.6rem] uppercase tracking-luxe text-white/75 backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <path
              d="M23 12s0-3.5-.44-5.06a2.62 2.62 0 0 0-1.85-1.85C19.14 4.65 12 4.65 12 4.65s-7.14 0-8.71.44A2.62 2.62 0 0 0 1.44 6.94C1 8.5 1 12 1 12s0 3.5.44 5.06a2.62 2.62 0 0 0 1.85 1.85c1.57.44 8.71.44 8.71.44s7.14 0 8.71-.44a2.62 2.62 0 0 0 1.85-1.85C23 15.5 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z"
              fill="currentColor"
            />
          </svg>
          YouTube ↗
        </a>
      )}
    </div>
  );
}
