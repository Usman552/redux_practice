import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "@/types/products";

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({
                    product,
                    quantity: 1,
                });
            }
        }
    },
});
export const {addToCart} = cartSlice.actions
export default cartSlice.reducer;