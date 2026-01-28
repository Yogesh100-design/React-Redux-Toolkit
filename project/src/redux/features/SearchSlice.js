import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "serach",
  initialState: {
    query: "",
    activeTab: "",
    result: "",
    loading: false,
    error: "",
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResult(state) {
      state.result = [];
    },
  },
});

export const {
  setQuery,
  setActiveTab,
  setResult,
  setLoading,
  setError,
  clearResult,
} = SearchSlice.actions;
export default SearchSlice.reducer;
