"use client";

import { useEffect } from "react";
import {useAppDispatch , useAppSelector} from "../store/hooks";
import { fetchCategoryData } from "@/store/slices/productsSlice";
import { ProductCard } from "@/components/ProductCard";

export function ReduxProducts() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state) => state.Products,
  );

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading Womens clothing...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold"> womens clothing</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
