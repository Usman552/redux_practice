import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product, ProductsState } from "../../types/products";

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchCategoryData = createAsyncThunk(
  "products/fetchElectronics",
  async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/women's clothing",
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Electronics (${response.status})`);
    }
    const data: Product[] = await response.json();
    return data;
  },
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load electronics";
      });
  },
});

export default ProductsSlice.reducer;
