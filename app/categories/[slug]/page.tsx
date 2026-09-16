import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/types/products";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  const response = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: Product[] = await response.json();

  if (products.length === 0) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Category
        </p>

        <h1 className="text-3xl font-bold capitalize tracking-tight sm:text-4xl">
          {category}
        </h1>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}
