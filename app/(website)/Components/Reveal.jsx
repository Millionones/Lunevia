"use client"
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react"

/**
 * Lightweight viewport-triggered reveal.
 *
 * Performance notes:
 * - Uses `LazyMotion` + the `m` component so only the ~5kb `domAnimation`
 *   feature set ships, not the full `motion` bundle.
 * - Animates transform/opacity only (compositor-friendly, no layout/paint).
 * - `whileInView` + `once` so it runs a single time and then stops observing.
 * - Honors `prefers-reduced-motion`: when set we drop the translate and just
 *   render the content in place (no motion), via `useReducedMotion`.
 */
export default function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.2,
  ...rest
}) {
  const prefersReduced = useReducedMotion()
  const MotionTag = m[as] || m.div

  const offset = prefersReduced ? 0 : y

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionTag
        className={className}
        initial={{ opacity: 0, y: offset }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, amount }}
        transition={{ duration: prefersReduced ? 0.2 : 0.6, delay: prefersReduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        {...rest}
      >
        {children}
      </MotionTag>
    </LazyMotion>
  )
}
