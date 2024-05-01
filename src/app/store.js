import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import themeModeSlice from "./slices/theme";
import authSlice from "./slices/auth";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    themeMode: themeModeSlice,
    auth: authSlice,
  },
});
