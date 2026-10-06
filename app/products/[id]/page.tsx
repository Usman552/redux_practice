import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProductById } from "@/lib/api/products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  return { title: product.title };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);
  const rating = Math.round(product.rating ?? 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:py-16">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-8"
        nativeButton={false}
        render={
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        }
      />

      {/* Product Details */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Product Image */}
        <div className="animate-in fade-in zoom-in-95 flex min-h-[400px] items-center justify-center rounded-2xl border bg-muted/30 p-8 duration-500">
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
        <div className="animate-in fade-in slide-in-from-bottom-2 flex flex-col justify-center duration-500">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>

          {/* Rating */}
          {product.rating !== undefined && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-primary">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={
                      star <= rating
                        ? "h-5 w-5 fill-current"
                        : "h-5 w-5 fill-none text-muted-foreground"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-muted-foreground">
                {product.rating?.toFixed(1)} rating
              </span>
            </div>
          )}

          {/* Price */}
          <p className="mt-6 text-3xl font-bold">
            ${product.price.toFixed(2)}
          </p>

          {product.stock !== undefined && (
            <p
              className={
                product.stock > 0
                  ? "mt-2 text-sm text-muted-foreground"
                  : "mt-2 text-sm font-medium text-destructive"
              }
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </p>
          )}

          {/* Description */}
          <p className="mt-6 leading-7 text-muted-foreground">
            {product.description}
          </p>

          {/* Add to Cart */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} className="flex-1" />

            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/products">Continue Shopping</Link>}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
