"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/store/slices/cartSlice";

export default function CartPage() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>

        <p className="mt-3 text-muted-foreground">
          You haven&apos;t added any products yet
        </p>

        <Button
          className="mt-6"
          nativeButton={false}
          render={<Link href="/products">Continue Shopping</Link>}
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-32 w-full sm:w-32">
              <Image
                src={item.product.image}
                alt={item.product.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                {item.product.category}
              </p>

              <h2 className="mt-1 font-semibold">{item.product.title}</h2>

              <p className="mt-2 font-bold">${item.product.price.toFixed(2)}</p>

              <p className="mt-2 text-sm">Quantity: {item.quantity}</p>
              <div className="flex gap-3">
                <Button
                  onClick={() => dispatch(increaseQuantity(item.product.id))}
                >
                  +
                </Button>
                <Button
                  onClick={() => dispatch(decreaseQuantity(item.product.id))}
                >
                  -
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => dispatch(removeItem(item.product.id))}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="w-full rounded-xl border p-6 sm:max-w-md">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="mt-4 flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
          </div>

          <Button
            className="mt-6 w-full"
            render={<Link href="/checkout">Proceed to Checkout</Link>}
          ></Button>
        </div>
      </div>
    </main>
  );
}
