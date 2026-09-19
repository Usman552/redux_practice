import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";
import "@testing-library/jest-dom/vitest";
import { ReduxProvider } from "../components/ReduxProvider";

describe("ProductCard Component", () => {
  const product = {
    id: 1,
    title: "Test Product",
    price: 100,
    description: "Test description",
    category: "test",
    image: "/test.jpg",
  };
  it("should render product information", () => {
    render(
      <ReduxProvider>
        <ProductCard product={product} />
      </ReduxProvider>,
    );
    const title = screen.getByText("Test Product");
    const price = screen.getByText("$100.00");
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
