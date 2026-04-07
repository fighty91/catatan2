import { RootState } from "@/lib/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Contact {
//   id: number;
//   name: string;
// }

// export interface ContactState {
//   value: Contact[];
// }

export interface ContactState {
  value: any[];
}

const initialState: ContactState = {
  value: []
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact: (state, action: PayloadAction<any[]>) => {
      state.value = action.payload;
    }
  }
});

export const { setContact } = contactSlice.actions;
export const selectContact = (state: RootState) => state.contact.value
export default contactSlice.reducer;