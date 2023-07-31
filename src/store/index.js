import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme/theme-slice";
import userSlice from "./user/user-slice";

const store = configureStore({
  reducer: { theme: themeSlice, currentUser: userSlice },
});

export default store;
