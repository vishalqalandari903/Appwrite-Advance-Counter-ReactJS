import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import themeModeSlice from "./slices/theme";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    themeMode: themeModeSlice,
  },
});
