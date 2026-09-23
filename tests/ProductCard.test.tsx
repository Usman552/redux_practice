import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "../components/ProductCard";
import "@testing-library/jest-dom/vitest";
import { ReduxProvider } from "../components/ReduxProvider";
import { store } from "../store/store";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { clearCart } from "../store/slices/cartSlice";

afterEach(() => {
  cleanup();
});

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
    const { container } = render(
      <ReduxProvider>
        <ProductCard product={product} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();

    const title = screen.getByText("Test Product");
    const price = screen.getByText("$100.00");
    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
  it("should add product to cart when clicked", () => {
    render(
      <ReduxProvider>
        <ProductCard product={product} />
      </ReduxProvider>,
    );

    const button = screen.getByRole("button", { name: "Add to Cart" });
    button.click();
    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].product.id).toBe(product.id);
    expect(state.cart.items[0].quantity).toBe(1);
  });
  it("should increase quantity when product is added twice", () => {
    render(
      <ReduxProvider>
        <ProductCard product={product}></ProductCard>
      </ReduxProvider>,
    );
    const button = screen.getByRole("button", { name: "Add to Cart" });
    button.click();
    button.click();
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(2);
  });
  beforeEach(() => {
    store.dispatch(clearCart());
  });
});
