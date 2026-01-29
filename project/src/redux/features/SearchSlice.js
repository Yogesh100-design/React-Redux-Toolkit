import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "",
    results: [],
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
      state.results = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResult(state) {
      state.results = [];
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
