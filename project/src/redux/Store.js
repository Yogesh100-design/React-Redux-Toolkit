import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/SearchSlice"

export const store = configureStore(
   {
      search:searchReducer
   }
)