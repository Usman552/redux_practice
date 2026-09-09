'use client'

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rounded-xl border p-8">
        <h1 className="text-3xl font-bold">🎉 Order Placed Successfully!</h1>

        <p className="mt-4 text-muted-foreground">
          Thank you for your order. Your order has been received successfully.
        </p>

        <div className="mt-8">
          <a
            href="/products"
            className="inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </main>
  );
}
