"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

// Soft white mist over the upper band of a hero. Each cloud bank has THREE
// composed transforms on nested elements so none of them fight:
//   wrapper (motion)   → scroll-linked parallax lift (different per layer = depth)
//   float div (CSS)    → slow vertical bob (opposite phase per layer)
//   layer (CSS)        → horizontal drift, opposite directions (they cross)
// Combined, the two banks criss-cross diagonally through each other. The layer
// tiles every 50% of its 200%-wide track, so the -50% drift loops seamlessly.
// Normal blend + low opacity keeps it subtle; masked below the header and above
// the foreground. Everything freezes for reduced motion.
const STYLES = `
@keyframes cloud-drift { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
@keyframes cloud-float-a { from { transform: translateY(0); } to { transform: translateY(-6%); } }
@keyframes cloud-float-b { from { transform: translateY(0); } to { transform: translateY(6%); } }
.cloud-drift {
  position:absolute; inset:0; overflow:hidden; pointer-events:none;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 50%, transparent 84%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 16%, #000 50%, transparent 84%);
}
.cloud-drift__scroll { position:absolute; inset:0; will-change:transform; }
.cloud-drift__float { position:absolute; inset:0; will-change:transform; }
.cloud-drift__float--1 { animation: cloud-float-a 24s ease-in-out infinite alternate; }
.cloud-drift__float--2 { animation: cloud-float-b 31s ease-in-out infinite alternate; }
.cloud-drift__layer {
  position:absolute; top:0; left:0; width:200%; height:72%;
  background-repeat:repeat-x; background-size:50% 100%;
  will-change:transform;
}
.cloud-drift__layer--1 {
  background-image:
    radial-gradient(48% 60% at 18% 42%, rgba(255,255,255,.80), transparent 74%),
    radial-gradient(42% 54% at 52% 30%, rgba(255,255,255,.62), transparent 74%),
    radial-gradient(52% 62% at 82% 50%, rgba(255,255,255,.74), transparent 74%);
  filter: blur(8px);
  opacity:.45;
  animation: cloud-drift 100s linear infinite;
}
.cloud-drift__layer--2 {
  background-image:
    radial-gradient(54% 66% at 30% 26%, rgba(255,255,255,.66), transparent 76%),
    radial-gradient(46% 58% at 66% 40%, rgba(255,255,255,.54), transparent 76%),
    radial-gradient(58% 64% at 95% 22%, rgba(255,255,255,.60), transparent 76%);
  filter: blur(14px);
  opacity:.30;
  /* Opposite direction so the two banks cross each other. */
  animation: cloud-drift 125s linear infinite reverse;
}
@media (prefers-reduced-motion: reduce) {
  .cloud-drift__layer--1, .cloud-drift__layer--2,
  .cloud-drift__float--1, .cloud-drift__float--2 { animation: none; }
}
`;

export default function CloudDrift() {
  const ref = React.useRef(null);
  const reduce = useReducedMotion();

  // 0 → 1 as the hero scrolls up and out of view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, mass: 0.5 });

  // Different magnitudes per layer = parallax depth on scroll; opposite x nudges
  // reinforce the crossing feel.
  const y1 = useTransform(progress, [0, 1], [0, -190]);
  const x1 = useTransform(progress, [0, 1], [0, 55]);
  const y2 = useTransform(progress, [0, 1], [0, -95]);
  const x2 = useTransform(progress, [0, 1], [0, -35]);

  return (
    <div ref={ref} className="cloud-drift" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <motion.div className="cloud-drift__scroll" style={reduce ? undefined : { y: y1, x: x1 }}>
        <div className="cloud-drift__float cloud-drift__float--1">
          <div className="cloud-drift__layer cloud-drift__layer--1" />
        </div>
      </motion.div>
      <motion.div className="cloud-drift__scroll" style={reduce ? undefined : { y: y2, x: x2 }}>
        <div className="cloud-drift__float cloud-drift__float--2">
          <div className="cloud-drift__layer cloud-drift__layer--2" />
        </div>
      </motion.div>
    </div>
  );
}
