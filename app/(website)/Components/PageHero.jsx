"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";

// Canvas mesh — client-only and lazy so it never blocks the hero paint.
const ConstellationGrid = dynamic(
  () => import("@/components/ui/creative/constellation-grid"),
  { ssr: false }
);

// Slow Ken-Burns drift on the backdrop (GPU-friendly, disabled for reduced motion).
const KENBURNS = `
@keyframes pagehero-kenburns {
  0%   { transform: scale(1.08) translate3d(0, 0, 0); }
  100% { transform: scale(1.16) translate3d(0, -1.6%, 0); }
}
@keyframes pagehero-kenburns-out {
  0%   { transform: scale(1.0) translate3d(0, 0, 0); }
  100% { transform: scale(1.05) translate3d(0, -1%, 0); }
}
.pagehero-kenburns { animation: pagehero-kenburns 20s ease-in-out infinite alternate; will-change: transform; }
.pagehero-kenburns--out { animation: pagehero-kenburns-out 22s ease-in-out infinite alternate; will-change: transform; }
@media (prefers-reduced-motion: reduce) {
  .pagehero-kenburns, .pagehero-kenburns--out { animation: none; transform: none; }
}
`;

const EASE = [0.16, 1, 0.3, 1];

function HeroTitle({ text, reduce }) {
  const words = String(text).split(" ");
  return (
    <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.55)] md:text-6xl lg:text-7xl">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.09 }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h1>
  );
}

/**
 * PageHero — the site-wide cinematic page hero. Full-bleed image + layered
 * legibility scrim + Ken-Burns drift + a staggered title reveal, with an
 * optional eyebrow, breadcrumb trail or subtitle, and a scroll cue. Uses a raw
 * <img> (like the destination-detail hero) so it works for both local banners
 * and remote CMS image URLs without next/image remote config.
 *
 * Props: title, eyebrow?, subtitle?, breadcrumbs? (string[]), image?, imageAlt?
 */
export default function PageHero({
  title,
  eyebrow,
  subtitle,
  breadcrumbs,
  image = "/About_us_banner.png",
  imageAlt,
  // Optional CTA below the subtitle. Renders only when buttonLabel is set, so
  // existing callers (no button) are unaffected.
  buttonLabel,
  buttonLink,
  // "in" (default) = gentle zoom-in Ken-Burns; "out" = sits near full-cover so
  // more of the photo is visible (least cropped). Note: this only reveals more
  // of the EXISTING image — it cannot add scenery beyond the original frame.
  zoom = "in",
  // Tailwind object-position (e.g. "object-top") to bias which part shows.
  objectPosition = "object-center",
  // Overlay a subtle brand-coloured constellation mesh over the image (a
  // signature "wow" moment). Lazy-loaded; disabled for reduced motion.
  particles = false,
}) {
  const reduce = useReducedMotion();
  const kenBurnsClass =
    zoom === "out" ? "pagehero-kenburns--out" : "pagehero-kenburns";

  return (
    <section className="relative flex h-[80vh] min-h-[540px] w-full items-center justify-center overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: KENBURNS }} />

      {/* Backdrop */}
      <img
        src={image}
        alt={imageAlt || title || ""}
        fetchPriority="high"
        className={`${kenBurnsClass} absolute inset-0 h-full w-full object-cover ${objectPosition}`}
      />
      {/* Legibility scrim (matches the detail-hero recipe) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />

      {/* Optional constellation mesh in brand colours (champagne nodes / emerald
          accent), drawn over the scrim. pointerTarget="window" so it reacts to
          the cursor without capturing clicks. */}
      {particles && !reduce ? (
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-80">
          <ConstellationGrid
            className="absolute inset-0 h-full w-full"
            colors={{ bg: "transparent", node: "233, 220, 195", accent: "52, 211, 153", lineAlpha: 0.26 }}
            pointerTarget="window"
          >
            <span aria-hidden />
          </ConstellationGrid>
        </div>
      ) : null}

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center text-white">
        {eyebrow ? (
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-white/75"
          >
            {eyebrow}
          </motion.span>
        ) : null}

        <HeroTitle text={title} reduce={reduce} />

        {/* Accent underline */}
        <motion.span
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-6 block h-px w-16 origin-center bg-white/50"
        />

        {subtitle ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base"
          >
            {subtitle}
          </motion.p>
        ) : null}

        {buttonLabel ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
            className="mt-8"
          >
            {/^https?:\/\//.test(buttonLink || "") ? (
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 transition hover:bg-white active:scale-95"
              >
                {buttonLabel}
              </a>
            ) : (
              <Link
                href={buttonLink || "#"}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-7 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 transition hover:bg-white active:scale-95"
              >
                {buttonLabel}
              </Link>
            )}
          </motion.div>
        ) : null}

        {Array.isArray(breadcrumbs) && breadcrumbs.length ? (
          <motion.nav
            aria-label="Breadcrumb"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.28em] text-white/70"
          >
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 ? <span className="text-white/40">»</span> : null}
                {i === 0 ? (
                  <Link href="/" className="transition-colors hover:text-white">
                    {crumb}
                  </Link>
                ) : (
                  <span className={i === breadcrumbs.length - 1 ? "text-white" : ""}>
                    {crumb}
                  </span>
                )}
              </React.Fragment>
            ))}
          </motion.nav>
        ) : null}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
