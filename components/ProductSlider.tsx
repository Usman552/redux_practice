"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types/products";
import { ProductCard } from "@/components/ProductCard";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";

export function ProductSlider({ products }: { products: Product[] }) {
  const { trackRef, scrollPrev, scrollNext } = useHorizontalScroll();

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-in fade-in fill-mode-backwards w-64 shrink-0 snap-start duration-500 sm:w-72"
          >
            <ProductCard product={product} showDiscountBadge />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Scroll left"
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Scroll right"
          className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
