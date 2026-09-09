"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  return (
    <Button
      size="lg"
      className={className}
      onClick={() => dispatch(addToCart(product))}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
}
