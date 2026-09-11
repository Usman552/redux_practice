import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product,
          quantity: 1,
        });
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },
 decreaseQuantity: (state, action: PayloadAction<number>) => {
  const item = state.items.find(
    (item) => item.product.id === action.payload
  );

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    }
  }
},
    removeItem:(state , action : PayloadAction<number>)=>{
        state.items = state.items.filter(
  (item) => item.product.id !== action.payload
);
    },
       clearCart: (state) => {
      state.items = [];
    },
  
  },
});

export const { addToCart, increaseQuantity ,decreaseQuantity,removeItem , clearCart} = cartSlice.actions;

export default cartSlice.reducer;