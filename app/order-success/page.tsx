import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="animate-in fade-in zoom-in-95 w-full rounded-xl border p-8 duration-500">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>

        <h1 className="text-3xl font-bold">Order Placed Successfully!</h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for your order. Your order has been received
          successfully.
        </p>

        <div className="mt-8">
          <Button
            nativeButton={false}
            render={<Link href="/products">Continue Shopping</Link>}
          />
        </div>
      </div>
    </main>
  );
}
