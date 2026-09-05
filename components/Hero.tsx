import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto flex min-h-[500px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="mb-4 text-sm font-medium text-muted-foreground">
          Welcome to MiniShop
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Discover Products You’ll Love
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Shop quality products at great prices, all in one place.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            nativeButton={false}
            render={<Link href="/products">Shop Now</Link>}
          />

          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/products">Explore Products</Link>}
          />
        </div>
      </div>
    </section>
  );
}
