"use client";

/** Video poster with a gold play button.
 *
 *  NOTE: the @amyrlaw channel currently has embedding DISABLED (YouTube
 *  Error 153 / "only available on YouTube"), so an inline iframe just shows an
 *  error. Until Amyr enables "Allow embedding" (per video, YouTube Studio →
 *  Content → Edit → Show more → Allow embedding) OR provides an mp4 to
 *  self-host, clicking the poster opens the video on YouTube in a new tab — no
 *  broken player. Once embedding is on, restore the click-to-load iframe.
 *
 *  PLACEHOLDER renders a styled "video coming" panel. */
export const PLACEHOLDER = "__PLACEHOLDER__";

export default function VideoEmbed({
  videoId,
  title = "Matisse Academy",
  poster,
}: {
  videoId: string;
  title?: string;
  poster?: string;
}) {
  const isPlaceholder = !videoId || videoId === PLACEHOLDER;

  const thumb =
    poster || (!isPlaceholder ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : undefined);
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

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
      ) : (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch on YouTube: ${title}`}
          className="group absolute inset-0 block h-full w-full"
        >
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
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.62rem] uppercase tracking-luxe text-white/70">
            Watch on YouTube ↗
          </span>
        </a>
      )}
    </div>
  );
}
