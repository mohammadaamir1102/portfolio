"use client";

import { useRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card with a pointer-following radial highlight. The effect is CSS-only
 * after the initial pointer update and is skipped on touch/coarse pointers.
 */
export function SpotlightCard({
  className,
  children,
  onPointerMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse") return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("spotlight-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}
