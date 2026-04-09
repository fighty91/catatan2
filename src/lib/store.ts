import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contact/contactSlice";
import productReducer from "./features/product/productSlice"

export const store = configureStore({
  reducer: {
    contact: contactReducer,
    product: productReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Appstore = typeof store;