import { createSlice } from "@reduxjs/toolkit";

export const SearchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "",
    results: [],
    loading: false,
    error: "",
    page: 1,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1; // Reset page on new query
    },
    setActiveTab(state, action) {
      state.activeTab = action.payload;
      state.page = 1; // Reset page on tab change
    },
    setResult(state, action) {
      state.results = action.payload;
      state.loading = false;
    },
    appendResults(state, action) {
      state.results = [...state.results, ...action.payload];
      state.loading = false;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
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
      state.page = 1;
    },
  },
});



export const {
  setQuery,
  setActiveTab,
  setResult,
  appendResults,
  setPage,
  incrementPage,
  setLoading,
  setError,
  clearResult,
} = SearchSlice.actions;
export default SearchSlice.reducer;
