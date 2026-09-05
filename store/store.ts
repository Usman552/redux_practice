import {configureStore} from "@reduxjs/toolkit";
import ProductsReducer from "../store/slices/productsSlice"


export const store = configureStore(
    {
        reducer:{
            Products:ProductsReducer,
        },
    }
)
export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;