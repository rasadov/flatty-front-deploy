import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchSearchResults } from "../services/searchService";

export const loadSearchResults = createAsyncThunk(
  "search/loadResults",
  async (filters, { rejectWithValue }) => {
    try {
      return await fetchSearchResults(filters);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(loadSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateFilters, clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
