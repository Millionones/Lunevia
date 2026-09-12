"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch: theme is only known on the client.
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="fixed bottom-28 right-8 z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-800 shadow-xl backdrop-blur transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-100"
    >
      {mounted ? (
        isDark ? <Sun size={20} /> : <Moon size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}
