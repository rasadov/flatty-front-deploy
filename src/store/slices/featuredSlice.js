import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeaturedProperties } from "../services/featuredService";

export const loadFeaturedProperties = createAsyncThunk(
  "featured/loadProperties",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFeaturedProperties();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const featuredSlice = createSlice({
  name: "featured",
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFeatured: (state) => {
      state.properties = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFeaturedProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loading = false;
      })
      .addCase(loadFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeatured } = featuredSlice.actions;
export default featuredSlice.reducer;
