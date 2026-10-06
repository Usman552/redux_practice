"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/products";
import { Button } from "./ui/button";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "sonner";

export function ProductCard({
  product,
  showDiscountBadge = false,
}: {
  product: Product;
  /** Shows a "-X% OFF" badge when the product has a meaningful discount. */
  showDiscountBadge?: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart", { description: product.title });
  };

  const discount = Math.round(product.discountPercentage ?? 0);
  const hasDiscount = showDiscountBadge && discount > 0;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="flex-1">
        <div className="relative aspect-square overflow-hidden">
          {hasDiscount && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-destructive px-2.5 py-1 text-xs font-semibold text-destructive-foreground">
              -{discount}% OFF
            </span>
          )}

          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        <div className="space-y-3 px-5 pt-5">
          <p className="text-sm text-muted-foreground">{product.category}</p>

          <h3 className="line-clamp-2 font-semibold">{product.title}</h3>

          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      <div className="p-5 pt-3">
        <Button
          className="w-full transition-transform active:scale-95"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
