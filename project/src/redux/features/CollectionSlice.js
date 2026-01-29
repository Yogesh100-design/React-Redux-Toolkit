import { createSlice } from "@reduxjs/toolkit";

export const CollectionSlice = createSlice({
  name: "collection",
  initialState: {
    item: [],
  },
  reducers: {
    addToCollection: (state, action) => {
      // const exist = state.item.find((item) => item.id === item.paylaod.id);

      // if (!exist) {
        state.item.push(action.payload);
      // }
    },
    removeFromCollection: (state, action) => {
      state.item = state.item.filter((item) => item.id !== action.payload);
    },
    clearCollection: (state) => {
      state.item = [];
    }
  },
});

export const {addToCollection, removeFromCollection, clearCollection} = CollectionSlice.actions;

export default CollectionSlice.reducer;