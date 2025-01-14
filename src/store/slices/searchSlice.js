import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchSearchResults } from '../api/searchAPI'; // Assuming you have an API function to fetch results

// Define the initial state
const initialState = {
  results: [],
  filters: {
    category: "",
    complex: "",
    area: { from: "", to: "" },
    renovation: [],
    floor: { from: "", to: "" },
    ceilingHeight: "",
    bathroom: [],
    furniture: [],
    rooms: { rooms: "", livingRoom: "", bedroom: "", balcony: "" },
    parkingSlot: "",
    swimmingPool: "",
    query: "",
    page: 1,
  },
  loading: false,
  error: null,
  totalPages: 1,
};

// Async thunk for loading search results
export const loadSearchResults = createAsyncThunk(
  "search/loadSearchResults",
  async (filters, { rejectWithValue }) => {
    try {
      // Assuming fetchSearchResults is an API call that returns search results based on filters
      const response = await fetchSearchResults(filters);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Create the slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Reducer to update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Reducer to clear filters
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    // Reducer to update the current page
    setCurrentPage: (state, action) => {
      state.filters.page = action.payload;
    },
    // Reducer to update total pages
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(loadSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { updateFilters, clearFilters, setCurrentPage, setTotalPages } =
  searchSlice.actions;

// Export reducer
export default searchSlice.reducer;
