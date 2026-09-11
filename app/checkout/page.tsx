"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import { clearCart } from "../../store/slices/cartSlice";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export default function CheckoutPage() {
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
  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      customer: formData,
      items: cartItems,
      total: cartTotal,
    });
    dispatch(clearCart());
    router.push("/order-success");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Customer Information</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2"
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
                className="mt-2 w-full rounded-md border bg-background px-3 py-2"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>

              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-md border bg-background px-3 py-2"
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
                className="mt-2 w-full rounded-md border bg-background px-3 py-2"
                placeholder="Enter your city"
              />
            </div>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your information to complete your order.
          </p>
        </section>

        <section className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">Order Summary</h2>

          <div className="mt-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between gap-4">
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
          <Button className="w-full" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </section>
      </div>
    </main>
  );
}
