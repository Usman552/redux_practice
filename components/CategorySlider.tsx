"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/types/products";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export function CategorySlider({ categories }: { categories: Category[] }) {
  const { trackRef, scrollPrev, scrollNext } = useHorizontalScroll();

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            style={{ animationDelay: `${index * 40}ms` }}
            className="group animate-in fade-in fill-mode-backwards flex w-36 shrink-0 snap-start flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-40"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-lg font-bold text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {category.name.charAt(0)}
            </div>

            <h3 className="text-sm font-semibold transition-colors group-hover:text-primary">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>

      {/* Edge fades hint that the row scrolls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent" />

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Scroll categories left"
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll categories right"
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
