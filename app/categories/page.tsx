import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Browse
      </p>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Categories
      </h1>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            style={{ animationDelay: `${index * 60}ms` }}
            className="group relative animate-in fade-in slide-in-from-bottom-4 overflow-hidden rounded-3xl border bg-card p-6 fill-mode-backwards duration-500 ease-out hover:-translate-y-1 hover:shadow-xl transition-[transform,box-shadow]"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm text-muted-foreground">
                0{index + 1}
              </span>

              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                {category.name}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Explore collection
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
