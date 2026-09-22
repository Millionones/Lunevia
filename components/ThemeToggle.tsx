"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable light/dark toggle button. Presentational + inline (no fixed
 * positioning) so it can live inside the header on desktop and inside the
 * hamburger menu on mobile. Callers pass `className` for colour/placement.
 */
export function ThemeToggleButton({
  className,
  label = false,
}: {
  className?: string;
  label?: boolean;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch: theme is only known on the client.
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const Icon = mounted && isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
    >
      <Icon size={20} />
      {label && (
        <span className="text-sm font-medium">
          {mounted && isDark ? "Light mode" : "Dark mode"}
        </span>
      )}
    </button>
  );
}
