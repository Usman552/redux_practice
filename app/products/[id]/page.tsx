import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "../../../types/products";
import { Navbar } from "@/components/Navbar";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const response = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: Product = await response.json();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Image */}
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border bg-muted/30 p-8">
            <div className="relative h-[350px] w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>

              <span className="text-sm text-muted-foreground">
                Customer Rating
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <p className="mt-6 leading-7 text-muted-foreground">
              {product.description}
            </p>

            {/* Add to Cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
