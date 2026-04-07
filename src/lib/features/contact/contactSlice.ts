import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactState {
  value: object
}

// Option A: Export a type alias for the array (Recommended)
// export type ConstactList = ContactState[];

const initialState = {
  value: {}
} as ContactState

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact: (state, action: PayloadAction<object>) => {
      state.value = action.payload
    }
  }
});

export const { setContact } = contactSlice.actions;

export const selectContact = (state: RootState) => state.contact.value

export default contactSlice.reducer;