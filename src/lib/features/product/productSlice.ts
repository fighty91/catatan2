import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../type";

export interface ProductState {
  value: Product[];
}

const initialState: ProductState = {
  value: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product[]>) => {
      state.value = action.payload;
    }
  }
});

export const { setProduct } = productSlice.actions;
export const selectProduct = (state: RootState) => state.product.value
export default productSlice.reducer;