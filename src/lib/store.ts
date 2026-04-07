import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contact/contactSlice";
// import reducers from "./reducers";

// const store = configureStore({
//   reducer: reducers
// });

// const { dispatch } = store;

// export { store, dispatch };

// export default configureStore({
//   reducer: {
//     contact: contactReducer
//   }
// });

export const store = configureStore({
  reducer: {
    contact: contactReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Appstore = typeof store;