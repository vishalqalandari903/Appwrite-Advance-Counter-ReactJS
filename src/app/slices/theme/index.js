import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("themeMode") || "dark";
export const themeModeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    darkMode: () => "dark",
    lightMode: () => "light",
  },
});

export default themeModeSlice.reducer;
export const { darkMode, lightMode } = themeModeSlice.actions;
