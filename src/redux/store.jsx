import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./redux/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});