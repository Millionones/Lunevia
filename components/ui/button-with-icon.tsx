"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonWithIconProps = React.ComponentProps<typeof Button> & {
  /** Icon shown in the sliding pill. Defaults to an up-right arrow. */
  icon?: React.ReactNode;
  /**
   * Render the icon chip as frosted "liquid glass" (translucent + backdrop
   * blur/saturate + rim highlight) instead of the solid inverse chip.
   * A lightweight CSS take on dashersw/liquid-glass-js (see memory reference);
   * that library's WebGL refraction is reserved for larger glass surfaces.
   */
  glass?: boolean;
  /**
   * Glass chip only: render the arrow white (for use over a dark/hero backdrop)
   * instead of the default black. Pair with a scroll state, e.g. white while the
   * header is transparent over the hero, black once it condenses.
   */
  arrowLight?: boolean;
};

/**
 * A pill button whose icon chip slides from the trailing edge to the leading
 * edge on hover. Colors use the project's semantic tokens
 * (`bg-primary`/`text-primary-foreground` for the button, `bg-background`/
 * `text-foreground` for the chip), so it inverts correctly in both light and
 * dark mode — see :root / .dark in app/globals.css.
 */
function ButtonWithIcon({
  children,
  className,
  icon,
  glass = false,
  arrowLight = false,
  ...props
}: ButtonWithIconProps) {
  const chipClassName = glass
    ? cn(
        "border bg-white/20 dark:bg-white/10 border-white/40 dark:border-white/25",
        "backdrop-blur-md backdrop-saturate-150",
        // Rim highlight (top) + soft inner glow + drop shadow = glass depth.
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),inset_0_-2px_4px_rgba(255,255,255,0.12),0_6px_16px_-4px_rgba(0,0,0,0.4)]",
        // Arrow colour + a contrasting halo so it stays legible on the glass.
        // On hover the button fills with `primary`, so the arrow flips to
        // `primary-foreground` to stay legible on the fill (correct in both
        // themes, since the pair inverts together). The dark-scoped variant is
        // required so it beats the resting `dark:text-white` on specificity —
        // otherwise the arrow stays white on the light dark-mode fill.
        "group-hover:text-primary-foreground dark:group-hover:text-primary-foreground",
        arrowLight
          ? "text-white [&_svg]:[filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))] group-hover:[&_svg]:[filter:none]"
          : // Black on light backdrops, but stay white in dark mode (the dark
            // scrolled bar / mobile panel would swallow a black arrow).
            "text-black dark:text-white [&_svg]:[filter:drop-shadow(0_1px_1px_rgba(255,255,255,0.55))] dark:[&_svg]:[filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.5))] group-hover:[&_svg]:[filter:none]"
      )
    : "bg-white text-black";

  return (
    <Button
      className={cn(
        "group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 hover:ps-14 hover:pe-6",
        className
      )}
      {...props}
    >
      <span className="relative z-10 transition-all duration-500">
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-1 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
          chipClassName
        )}
      >
        {icon ?? <ArrowUpRight size={16} />}
      </span>
    </Button>
  );
}

export { ButtonWithIcon };
export type { ButtonWithIconProps };
