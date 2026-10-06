"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";

export function AddToCartButton({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addToCart(product));
    toast.success("Added to cart", { description: product.title });
  };

  return (
    <Button
      size="lg"
      className={className}
      disabled={product.stock === 0}
      onClick={handleClick}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
