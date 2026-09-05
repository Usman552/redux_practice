import Image from "next/image";
import { Product } from "../types/products";
import { Button } from "./ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-6"
        />
      </div>

      <div className="space-y-3 p-5">
        <p className="text-sm text-muted-foreground">{product.category}</p>

        <h3 className="line-clamp-2 font-semibold">{product.title}</h3>

        <p className="text-lg font-bold">${product.price.toFixed(2)}</p>

        <Button className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
}
