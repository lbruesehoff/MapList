import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global-store";
import { firebaseApi } from "../api/firebase-api"; // Adjust the import path as needed

const store = configureStore({
  reducer: {
    global: globalReducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firebaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
