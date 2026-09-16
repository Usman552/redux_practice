import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default async function CategoriesPage() {
  const response = await fetch("https://fakestoreapi.com/products/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories: string[] = await response.json();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Browse
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Categories
        </h1>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                <h3 className="text-xl font-semibold capitalize transition-colors group-hover:text-primary">
                  {category}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Explore collection
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
