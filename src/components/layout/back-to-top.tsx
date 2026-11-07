"use client";

import { Icon } from "@/components/ui/icon";
import { useScrollState } from "@/hooks/use-scroll-state";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const { scrolled } = useScrollState(900);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-5 right-5 z-40 inline-flex size-10 items-center justify-center rounded-full border border-border-strong bg-surface/80 text-muted shadow-lg backdrop-blur transition-all duration-300 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:bottom-8 sm:right-8",
        scrolled
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Icon name="arrowUp" className="size-4" />
    </button>
  );
}
