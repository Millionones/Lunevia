"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_OUT = [0.16, 1, 0.3, 1] as const; // strong deceleration for the "crash"
const SESSION_KEY = "lunevia_splash_seen";

// true = replay on every homepage load; false = play once per browser session.
const REPLAY_ALWAYS = false;

// Crescent knobs. Positions are % of the wordmark box (586-wide source):
//   "e" spans x 284..332 -> centre 308/586 = 52.56%.
const MARK_LEFT = "52.56%"; // crescent centre = the wordmark "e" centre
const MARK_W_PCT = "21%"; // crescent width as % of the wordmark box (~matches text height)
const MARK_X = 0; // px fine-nudge (right = +)
const MARK_Y = 0; // px fine-nudge (down = +)

// Wordmark halves (the "e" is cut out; the crescent fills it):
//   LUN  = x 0..284  -> width 284/586 = 48.46%
//   VIA  = x 332..586 -> left 332/586 = 56.66%, width 254/586 = 43.34%
const LUN_W = "48.46%";
const VIA_LEFT = "56.66%";
const VIA_W = "43.34%";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

/**
 * First-load brand splash:
 *   1. the crescent mark spins in (pointing right) and STAYS as the wordmark "e"
 *      (pinned at the real "e" position, so it can't misalign),
 *   2. LUN flies in from the left and VIA from the right — fast — and lock to the
 *      crescent's edges, completing LUNEVIA (an impact pulse on contact),
 *   3. the lockup zoom-fades and the homepage appears.
 * Homepage-only, once per session, reduced-motion aware. Transform/opacity only.
 */
export default function SplashScreen() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const [show, setShow] = React.useState(true);
  const [crash, setCrash] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  useIsoLayoutEffect(() => {
    if (!isHome) {
      setShow(false);
      return;
    }
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    if (seen && !REPLAY_ALWAYS) {
      setShow(false);
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setShow(true);
  }, [isHome]);

  React.useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  React.useEffect(() => {
    if (!show || !isHome) return;
    if (reduce) {
      const t = setTimeout(() => setShow(false), 1700);
      return () => clearTimeout(t);
    }
    const tCrash = setTimeout(() => setCrash(true), 1500);
    const tZoom = setTimeout(() => setZoom(true), 2150);
    const tEnd = setTimeout(() => setShow(false), 2750);
    return () => {
      clearTimeout(tCrash);
      clearTimeout(tZoom);
      clearTimeout(tEnd);
    };
  }, [show, isHome, reduce]);

  // Fast slide-in that snaps into place.
  const slide = { duration: 0.45, ease: EASE_OUT, delay: 1.0 };

  return (
    <AnimatePresence mode="wait">
      {show && isHome ? (
        <motion.div
          key="lunevia-splash"
          role="presentation"
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Lockup — zoom-fades on exit */}
          <motion.div
            className="relative flex items-center justify-center [will-change:transform,opacity]"
            animate={reduce ? {} : { scale: zoom ? 1.35 : 1, opacity: zoom ? 0 : 1 }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            {/* Wordmark box — everything positioned at the letters' real % positions.
                Crash-pulses on impact. */}
            <motion.div
              className="relative w-[min(72vw,520px)] [will-change:transform]"
              style={{ aspectRatio: "586 / 82" }}
              animate={!reduce && crash ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Crescent mark — pinned at the "e" position, spins in pointing right, STAYS */}
              {!reduce ? (
                <div
                  className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: MARK_LEFT, width: MARK_W_PCT, marginLeft: MARK_X, marginTop: MARK_Y }}
                >
                  <motion.img
                    src="/crescent-mark.png"
                    alt=""
                    aria-hidden
                    draggable={false}
                    className="pointer-events-none h-auto w-full select-none [will-change:transform,opacity]"
                    initial={{ opacity: 0, scale: 0.42, rotate: -180 }}
                    animate={{
                      opacity: [0, 1, 1, 1],
                      // spin in small, hold, then SCALE UP to match the text size.
                      scale: [0.42, 0.62, 0.62, 1],
                      rotate: [-180, 360, 360, 360],
                    }}
                    transition={{ duration: 1.5, ease: EASE, times: [0, 0.42, 0.6, 1] }}
                  />
                </div>
              ) : null}

              {/* LUN — flies in from the left */}
              <motion.img
                src="/logo-lun.png"
                alt="Lun"
                draggable={false}
                className="absolute left-0 top-0 z-10 h-auto select-none [will-change:transform,opacity]"
                style={{ width: LUN_W }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: "-100vw" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={reduce ? { duration: 0.6, delay: 0.2 } : slide}
              />

              {/* VIA — flies in from the right */}
              <motion.img
                src="/logo-via.png"
                alt="via"
                draggable={false}
                className="absolute top-0 z-10 h-auto select-none [will-change:transform,opacity]"
                style={{ left: VIA_LEFT, width: VIA_W }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: "100vw" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={reduce ? { duration: 0.6, delay: 0.2 } : slide}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
