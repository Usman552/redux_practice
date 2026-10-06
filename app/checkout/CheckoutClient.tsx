"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { clearCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const REQUIRED_FIELDS: (keyof CheckoutFormData)[] = ["name", "email", "address"];

export function CheckoutClient() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const router = useRouter();

  const isFormValid = REQUIRED_FIELDS.every((field) => formData[field].trim());
  const canPlaceOrder = cartItems.length > 0 && isFormValid;

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return;

    console.log("Order placed:", {
      customer: formData,
      items: cartItems,
      total: cartTotal,
    });

    dispatch(clearCart());
    toast.success("Order placed successfully!");
    router.push("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="text-3xl font-bold">Nothing to check out</h1>

          <p className="mt-3 text-muted-foreground">
            Your cart is empty - add a few products first.
          </p>

          <Button
            className="mt-6"
            nativeButton={false}
            render={<Link href="/products">Browse Products</Link>}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border p-6 duration-500">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">
                Full Name <span className="text-destructive">*</span>
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-ring"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-ring"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>

              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-ring"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Address <span className="text-destructive">*</span>
              </label>

              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-ring"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label className="text-sm font-medium">City</label>

              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    city: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-ring"
                placeholder="Enter your city"
              />
            </div>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Fields marked <span className="text-destructive">*</span> are
            required.
          </p>
        </section>

        <section
          style={{ animationDelay: "100ms" }}
          className="animate-in fade-in slide-in-from-bottom-2 fill-mode-backwards rounded-xl border p-6 duration-500"
        >
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between gap-4"
              >
                <span className="text-sm">
                  {item.product.title} × {item.quantity}
                </span>

                <span className="font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button
            className="w-full"
            disabled={!canPlaceOrder}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </section>
      </div>
    </main>
  );
}
