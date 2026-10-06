import type { Metadata } from "next";
import { Products } from "@/components/Product";

export const metadata: Metadata = {
  title: "Products",
};

export default function ProductsPage() {
  return (
    <main>
      <Products />
    </main>
  );
}
