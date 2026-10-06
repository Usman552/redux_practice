"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-muted-foreground">
          We couldn&apos;t load this page. This is often a temporary issue
          with a product data source - please try again.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={() => reset()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>

          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/">Back to home</Link>}
          />
        </div>
      </div>
    </main>
  );
}
