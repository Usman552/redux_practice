import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "../store/slices/productsSlice"
import cartSlice from "../store/slices/cartSlice"


export const store = configureStore(
    {
        reducer:{
            Products:ProductsReducer,
            cart:cartSlice,

        },
    }
)
export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;