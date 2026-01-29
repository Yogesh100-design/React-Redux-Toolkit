import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/SearchSlice";
import CollectionReducer from "./features/CollectionSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    collection: CollectionReducer,
  },
});
