import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="border-b">
      <div className="mx-auto flex min-h-[500px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="animate-in fade-in slide-in-from-bottom-2 mb-4 text-sm font-medium text-muted-foreground duration-700">
          Welcome to Nexora
        </p>

        <h1
          style={{ animationDelay: "80ms" }}
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards max-w-3xl text-4xl font-bold tracking-tight duration-700 sm:text-5xl lg:text-6xl"
        >
          Discover Products You’ll Love
        </h1>

        <p
          style={{ animationDelay: "160ms" }}
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards mt-6 max-w-2xl text-lg text-muted-foreground duration-700"
        >
          Shop quality products at great prices, all in one place.
        </p>

        <div
          style={{ animationDelay: "240ms" }}
          className="animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards mt-8 flex flex-col gap-3 duration-700 sm:flex-row"
        >
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
