import { describe, it, expect } from "vitest";
import cartReducer, { addToCart, removeItem, increaseQuantity, decreaseQuantity } from "../store/slices/cartSlice";

describe("Cart Slice", () => {
    it("should add an item to the cart", () => {
        const product = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            category: "test",
            image: "test.jpg",
        };

        const state = cartReducer(undefined, addToCart(product));
        expect(state.items[0].quantity).toBe(1);

    });
    it("should increase quantity when the same product is added", () => {
        const product = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            category: "test",
            image: "test.jpg",
        };

        const state = cartReducer(cartReducer(undefined, addToCart(product)), addToCart(product));
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);

    });
    it("should increase product quantity", () => {
        const product = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            category: "test",
            image: "test.jpg",
        };
        const state = cartReducer(cartReducer(undefined, addToCart(product)), increaseQuantity(product.id));
        expect(state.items[0].quantity).toBe(2);

    });
    it("should decrease product quantity", () => {
        const product = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            category: "test",
            image: "test.jpg",
        };
        const state = cartReducer(cartReducer(cartReducer(undefined, addToCart(product)), addToCart(product)), decreaseQuantity(product.id));
        expect(state.items[0].quantity).toBe(1);

    });
    it("should remove product from cart", () => {
        const product = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            category: "test",
            image: "test.jpg",
        };
        const state = cartReducer(cartReducer(cartReducer(undefined, addToCart(product)), addToCart(product)), removeItem(product.id));
        expect(state.items).toHaveLength(0);
    })
});
