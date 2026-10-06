import { Hero } from "@/components/Hero";
import { ReduxProducts } from "@/components/ReduxProducts";
import { CategorySlider } from "@/components/CategorySlider";
import { ProductSlider } from "@/components/ProductSlider";
import { TrustBadges } from "@/components/TrustBadges";
import Link from "next/link";
import { getCategories, getDeals } from "@/lib/api/products";

export default async function Home() {
  const [categories, deals] = await Promise.all([
    getCategories(),
    getDeals(),
  ]);

  return (
    <main>
      <Hero />

      {/* Trust badges */}
      <section className="border-b py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by category
          </h2>
        </div>

        <CategorySlider categories={categories} />
      </section>

      {/* Flash Deals */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-destructive">
                Limited time
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Flash Deals
              </h2>
            </div>
          </div>

          <ProductSlider products={deals} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Curated for you
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Trending now
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
  );
}
