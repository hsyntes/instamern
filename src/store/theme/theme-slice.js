import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme(state, action) {
      const { payload } = action;

      state.theme = payload;

      return state;
    },
  },
});

export const themeSliceActions = themeSlice.actions;
export default themeSlice.reducer;
