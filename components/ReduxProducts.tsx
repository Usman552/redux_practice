"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "@/store/slices/productsSlice";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductCardSkeleton";
import { ProductsError } from "@/components/ProductsError";

export function ReduxProducts() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state) => state.Products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <ProductsError message={error} onRetry={() => dispatch(fetchProducts())} />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product, index) => (
        <div
          key={product.id}
          style={{ animationDelay: `${index * 60}ms` }}
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 ease-out"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
