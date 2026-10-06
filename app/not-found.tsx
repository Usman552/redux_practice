import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Compass className="h-7 w-7 text-muted-foreground" />
        </div>

        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>

        <p className="mt-3 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button nativeButton={false} render={<Link href="/">Go home</Link>} />

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/products">Browse products</Link>}
          />
        </div>
      </div>
    </main>
  );
}
