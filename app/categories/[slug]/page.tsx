import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/api/products";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: toTitle(slug) };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Category
      </p>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {toTitle(slug)}
      </h1>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    </main>
  );
}
