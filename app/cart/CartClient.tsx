"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/store/slices/cartSlice";

export function CartClient() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="text-3xl font-bold">Your Cart is Empty</h1>

          <p className="mt-3 text-muted-foreground">
            You haven&apos;t added any products yet
          </p>

          <Button
            className="mt-6"
            nativeButton={false}
            render={<Link href="/products">Continue Shopping</Link>}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={item.product.id}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-in fade-in slide-in-from-bottom-2 flex flex-col gap-4 fill-mode-backwards rounded-xl border p-4 duration-500 sm:flex-row sm:items-center"
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

              <p className="mt-2 font-bold">
                ${item.product.price.toFixed(2)}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      dispatch(decreaseQuantity(item.product.id))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Increase quantity"
                    onClick={() =>
                      dispatch(increaseQuantity(item.product.id))
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove from cart"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => dispatch(removeItem(item.product.id))}
                >
                  <Trash2 className="h-4 w-4" />
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
            nativeButton={false}
            render={<Link href="/checkout">Proceed to Checkout</Link>}
          />
        </div>
      </div>
    </main>
  );
}
