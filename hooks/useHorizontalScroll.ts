"use client";

import { useRef } from "react";

/**
 * Drives a native horizontally-scrolling row (no carousel library) - the
 * track just needs `overflow-x-auto scrollbar-hide` and each item
 * `snap-start`, and these two functions page it left/right.
 */
export function useHorizontalScroll() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return {
    trackRef,
    scrollPrev: () => scrollByAmount("prev"),
    scrollNext: () => scrollByAmount("next"),
  };
}
