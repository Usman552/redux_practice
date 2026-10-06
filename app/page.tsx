import { Hero } from "@/components/Hero";
import { ReduxProducts } from "@/components/ReduxProducts";
import Link from "next/link";
import { getCategories } from "@/lib/api/products";

export default async function Home() {
  const categories = await getCategories();

  return (
    <>
      <main>
        <Hero />

        {/* Categories */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Explore
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Shop by category
              </h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>

        {/* Featured Products */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Curated for you
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Featured products
                </h2>
              </div>

              <Link
                href="/products"
                className="hidden text-sm font-medium transition-colors hover:text-primary sm:block"
              >
                View all products →
              </Link>
            </div>

            <ReduxProducts />
          </div>
        </section>

        {/* Promotion */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border bg-card p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                NEXORA EDIT
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Designed for your everyday
              </h2>

              <p className="mt-4 text-muted-foreground">
                Discover carefully selected pieces made to bring style, comfort
                and confidence to your everyday collection
              </p>

              <Link
                href="/products"
                className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
              >
                Explore collection
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
