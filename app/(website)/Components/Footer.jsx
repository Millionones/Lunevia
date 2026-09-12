"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BOOKING_URL } from "@/config";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Theme-adaptive styles (resolve against shadcn tokens; footer is forced dark).
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--font-lato-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}
@keyframes footer-breathe { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } }
@keyframes footer-scroll-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes footer-heartbeat { 0%, 100% { transform: scale(1); } 15%, 45% { transform: scale(1.2); } 30% { transform: scale(1); } }
.animate-footer-breathe { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear infinite; }
.animate-footer-heartbeat { animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; color: #ef6461; }
.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.footer-aurora {
  background: radial-gradient(circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%, transparent 70%);
}
.footer-light-gradient {
  /* Matches .site-gradient-bg (light) so the footer blends with the page. */
  background: radial-gradient(125% 125% at 50% 90%, #ffffff 42%, #e9dcc3 100%);
}
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 0 20px 40px -10px var(--pill-shadow-hover), inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}
.footer-giant-bg-text {
  font-size: 26vw; line-height: 0.75; font-weight: 900; letter-spacing: -0.03em;
  color: transparent; -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 6%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text; background-clip: text;
}
/* Logo wordmark masked from logo-white.png; slice layers sweep colour through it. */
.footer-logo-mask {
  position: relative;
  width: min(92vw, 1300px);
  aspect-ratio: 2000 / 266;
  margin-inline: auto;
  overflow: hidden;
  -webkit-mask: url(/logo-official-white.png) center / contain no-repeat;
  mask: url(/logo-official-white.png) center / contain no-repeat;
}
.footer-logo-base {
  position: absolute; inset: 0;
  background: color-mix(in oklch, var(--foreground) 14%, transparent);
}
.footer-logo-slice {
  position: absolute; inset: 0;
  z-index: 10; pointer-events: none;
  will-change: transform, opacity;
}
.footer-logo-slice--top {
  background: #4f46e5;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}
.footer-logo-slice--mid {
  background: color-mix(in oklch, var(--foreground) 55%, transparent);
  clip-path: polygon(0 35%, 100% 35%, 100% 65%, 0 65%);
}
.footer-logo-slice--bot {
  background: #4f46e5;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}
.dark .footer-logo-slice--top,
.dark .footer-logo-slice--bot { background: #34d399; }
.footer-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 40%, transparent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  text-shadow: 0 0 14px color-mix(in oklch, var(--foreground) 12%, transparent);
  will-change: transform, opacity;
}
.footer-marquee-track { will-change: transform; transform: translateZ(0); }
/* Mobile GPUs choke on many backdrop-filter layers — drop them on small screens. */
@media (max-width: 640px) {
  .footer-glass-pill { backdrop-filter: none; -webkit-backdrop-filter: none; }
}
`;

const MagneticButton = React.forwardRef(
    ({ className = "", children, as: Component = "button", ...props }, forwardedRef) => {
        const localRef = useRef(null);

        useEffect(() => {
            if (typeof window === "undefined") return;
            const element = localRef.current;
            if (!element) return;
            element.style.willChange = "transform";
            const ctx = gsap.context(() => {
                // quickTo setters are created once and reused — no new tween per mousemove.
                const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power2.out" });
                const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power2.out" });
                const rxTo = gsap.quickTo(element, "rotationX", { duration: 0.4, ease: "power2.out" });
                const ryTo = gsap.quickTo(element, "rotationY", { duration: 0.4, ease: "power2.out" });
                const handleMouseMove = (e) => {
                    const rect = element.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    xTo(x * 0.4); yTo(y * 0.4); rxTo(-y * 0.15); ryTo(x * 0.15);
                    gsap.to(element, { scale: 1.05, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                };
                const handleMouseLeave = () => {
                    gsap.to(element, {
                        x: 0, y: 0, rotationX: 0, rotationY: 0,
                        scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.2,
                    });
                };
                element.addEventListener("mousemove", handleMouseMove);
                element.addEventListener("mouseleave", handleMouseLeave);
                return () => {
                    element.removeEventListener("mousemove", handleMouseMove);
                    element.removeEventListener("mouseleave", handleMouseLeave);
                };
            }, element);
            return () => ctx.revert();
        }, []);

        return (
            <Component
                ref={(node) => {
                    localRef.current = node;
                    if (typeof forwardedRef === "function") forwardedRef(node);
                    else if (forwardedRef) forwardedRef.current = node;
                }}
                className={`cursor-pointer ${className}`}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
MagneticButton.displayName = "MagneticButton";

const socials = [
    { href: "https://www.facebook.com/profile.php?id=61574276712917", src: "/facebook_white.png", alt: "Facebook" },
    { href: "https://www.instagram.com/lunevia_resorts/", src: "/instagram_white.png", alt: "Instagram" },
    { href: "https://pin.it/B6u8cDOdo", src: "/pintrest_white.png", alt: "Pinterest" },
    { href: "https://x.com/luneviaresorts", src: "/twitter_white.png", alt: "X" },
    { href: "https://www.linkedin.com/company/lunevia/?viewAsMember=true", src: "/linkedin-app-white-icon.png", alt: "LinkedIn" },
    { href: "https://www.youtube.com/@Luneviaresorts", src: "/youtube-app-white-icon.png", alt: "YouTube" },
];

const MarqueeItem = () => (
    <div className="flex items-center space-x-12 px-6">
        <span>Curated Stays</span> <span className="text-primary/60">✦</span>
        <span>Signature Experiences</span> <span className="text-secondary/60">✦</span>
        <span>Private Villas</span> <span className="text-primary/60">✦</span>
        <span>Backwater Reserves</span> <span className="text-secondary/60">✦</span>
        <span>Timeless Kerala</span> <span className="text-primary/60">✦</span>
    </div>
);

const Arrow = () => (
    <svg className="w-4 h-4 -mr-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

// Footer wordmark: the LUNEVIA logo image used as a CSS mask, with three
// horizontal slice layers (indigo in light / emerald in dark) sweeping colour
// through the letter shapes then fading — the same 3-slice reveal as before,
// but playing through the actual logo rather than live text. The mask clips the
// slices to the logo silhouette; the base fill uses --foreground so the logo
// stays legible in both the light (champagne) and dark footer.
const LogoSweep = () => (
    <div className="footer-logo-mask">
        {/* Faint resting base — keeps the logo visible between sweeps */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="footer-logo-base"
        />
        {/* Top slice — sweeps left → right */}
        <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="footer-logo-slice footer-logo-slice--top"
        />
        {/* Middle slice — sweeps right → left */}
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "-100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, delay: 0.12, ease: "easeInOut" }}
            className="footer-logo-slice footer-logo-slice--mid"
        />
        {/* Bottom slice — sweeps left → right */}
        <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, delay: 0.24, ease: "easeInOut" }}
            className="footer-logo-slice footer-logo-slice--bot"
        />
    </div>
);

const Footer = () => {
    const wrapperRef = useRef(null);
    const headingRef = useRef(null);
    const linksRef = useRef(null);
    const [shutterKey, setShutterKey] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined" || !wrapperRef.current) return;
        const ctx = gsap.context(() => {
            // One-shot reveal (NOT scrubbed). immediateRender:false keeps the
            // content visible by default, so if ScrollTrigger's geometry is ever
            // off (e.g. the pinned gallery above shifts layout) the footer can
            // never get stuck at opacity:0 — it just skips the intro.
            gsap.from([headingRef.current, linksRef.current], {
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                immediateRender: false,
                clearProps: "opacity,transform",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        }, wrapperRef);
        return () => ctx.revert();
    }, []);

    // Replay the shutter wordmark each time the footer scrolls into view (it is
    // always mounted but hidden by the curtain, so we can't rely on mount alone).
    useEffect(() => {
        const el = wrapperRef.current;
        if (typeof window === "undefined" || !el) return;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setShutterKey((k) => k + 1);
                });
            },
            { threshold: 0.25 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div className="footer-root">
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />

            <div
                ref={wrapperRef}
                className="relative h-screen w-full"
                style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
            >
                <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper">
                    {/* Light-mode gradient background (site champagne theme); hidden in dark */}
                    <div className="footer-light-gradient absolute inset-0 z-0 pointer-events-none dark:hidden" />
                    {/* Ambient light (dark only) + grid (both) */}
                    <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0 hidden dark:block" />
                    <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

                    {/* Logo wordmark backdrop — masked 3-slice colour sweep */}
                    <div className="absolute bottom-[13vh] left-1/2 w-full -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
                        <AnimatePresence mode="wait">
                            <LogoSweep key={shutterKey} />
                        </AnimatePresence>
                    </div>

                    {/* Diagonal marquee */}
                    <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/85 py-4 z-10 -rotate-2 scale-110 shadow-2xl">
                        <div className="footer-marquee-track flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
                            <MarqueeItem />
                            <MarqueeItem />
                        </div>
                    </div>

                    {/* Center content */}
                    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-16 md:mt-20 w-full max-w-5xl mx-auto">
                        <h2
                            ref={headingRef}
                            className="text-4xl sm:text-5xl md:text-8xl font-black footer-text-glow tracking-tighter mb-8 md:mb-12 text-center"
                        >
                            Begin your escape
                        </h2>

                        <div ref={linksRef} className="flex flex-col items-center gap-4 md:gap-6 w-full">
                            {/* Primary CTAs */}
                            <div className="flex flex-wrap justify-center gap-4 w-full">
                                <MagneticButton as="a" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="footer-glass-pill px-6 py-3 md:px-10 md:py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group">
                                    Book Your Stay <Arrow />
                                </MagneticButton>
                                <MagneticButton as={Link} href="/destinations" className="footer-glass-pill px-6 py-3 md:px-10 md:py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group">
                                    Explore Destinations <Arrow />
                                </MagneticButton>
                            </div>

                            {/* Secondary links */}
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full mt-2">
                                <MagneticButton as={Link} href="/philosophy-experience" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">Experience</MagneticButton>
                                <MagneticButton as={Link} href="/blog" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">Journal</MagneticButton>
                                <MagneticButton as={Link} href="/Contact-us" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">Enquiry</MagneticButton>
                                <MagneticButton as={Link} href="/faq" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">FAQs</MagneticButton>
                                <MagneticButton as={Link} href="/privacy-policy" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">Privacy</MagneticButton>
                                <MagneticButton as={Link} href="/terms-and-conditions" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">Terms</MagneticButton>
                            </div>

                            {/* Socials */}
                            <div className="flex flex-wrap justify-center gap-3 w-full mt-2">
                                {socials.map((s) => (
                                    <MagneticButton
                                        key={s.alt}
                                        as="a"
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.alt}
                                        className="footer-glass-pill w-11 h-11 rounded-full flex items-center justify-center"
                                    >
                                        <img src={s.src} alt={s.alt} width={18} height={18} className="opacity-80 brightness-0 dark:brightness-100" />
                                    </MagneticButton>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar — centered copyright only */}
                    <div className="relative z-20 w-full pb-8 px-6 flex justify-center">
                        <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase text-center">
                            © 2026 Lunevia, Powered by Horatio
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
