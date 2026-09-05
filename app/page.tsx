import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Products } from "../components/Product";
import { ReduxProducts } from "@/components/ReduxProducts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <h2 className="font-bold text-2xl text-center">Redux Products</h2>
        <ReduxProducts />
      </main>
    </>
  );
}
