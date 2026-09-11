import { Navbar } from "@/components/Navbar";
import { Products } from "@/components/Product";
import { ReduxProducts } from "@/components/ReduxProducts";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <Products />
        <ReduxProducts />
      </main>
    </>
  );
}
