/**
 * Centralized animation configuration.
 * Every timing / distance / scale value the intro uses lives here so the
 * motion can be tuned without touching component logic. No magic numbers
 * in the components themselves.
 */

export const intro = {
  /** Idle "breathing" of the hero logo before the user scrolls. */
  breathe: {
    scaleFrom: 1,
    scaleTo: 1.02, // ~2% per brief
    durationSec: 4.5,
    ease: "sine.inOut",
  },
  /** Gentle vertical float layered on top of the breathe. */
  float: {
    yPx: 10,
    durationSec: 6,
    ease: "sine.inOut",
  },
  /** Soft ambient glow pulse behind the logo. */
  glow: {
    opacityFrom: 0.35,
    opacityTo: 0.6,
    durationSec: 5,
    ease: "sine.inOut",
  },
  /** Scroll-driven transition: hero logo -> permanent nav logo. */
  scroll: {
    /** Height of the sticky-pinned wrapper (viewport heights). The stage stays
     *  put for (pinWrapVh - 100)vh of scroll, then releases straight into the
     *  homepage with no empty tail. */
    pinWrapVh: 240,
    /** GSAP scrub smoothing in seconds. */
    scrub: 1.1,
    /** Hero logo is clear at rest, then as you scroll it grows larger and
     *  fades out, opening into the hero section behind it. */
    logo: {
      scaleTo: 1.9,
      /** Fraction of the scroll over which the logo fades to zero. */
      fadeDuration: 0.7,
    },
    /** Camera "push in": the whole stage eases forward slightly as you scroll. */
    stage: {
      scaleTo: 1.06,
    },
    /** When the permanent nav logo fades in (scroll progress 0-1). */
    navFadeInAt: 0.42,
  },
  /** Progressive reveal of the homepage beneath the intro. */
  reveal: {
    /** Scroll progress (0-1) at which each layer begins fading in. */
    startAt: 0.45,
    staggerSec: 0.12,
    durationSec: 0.9,
    ease: "power2.out",
    yFromPx: 28,
  },
  /** Scroll-cue affordance at the bottom of the hero. */
  cue: {
    bounceYPx: 8,
    durationSec: 1.6,
    ease: "sine.inOut",
    /** Fade the cue out once this much scroll progress is reached. */
    hideAtProgress: 0.08,
  },
} as const;

export const easings = {
  entrance: "power3.out",
  soft: "sine.inOut",
} as const;
