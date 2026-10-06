"use client";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types/products";
import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/lib/api/products";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { ProductsError } from "@/components/ProductsError";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Intentional: kicks off the initial product fetch. loading/error are
    // already at their default values on mount, so this is a no-op render
    // the first time - it only matters for the retry button's re-fetch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10">
          <p className="text-sm font-medium text-muted-foreground">
            Our Collection
          </p>
          <h2 className="mt-2 text-3xl font-bold">Featured Products</h2>
        </div>

        {loading ? (
          <ProductGridSkeleton />
        ) : error ? (
          <ProductsError message={error} onRetry={fetchProducts} />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 ease-out"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
