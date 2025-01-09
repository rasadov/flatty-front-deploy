import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularProperties } from "../services/PopularService";

export const loadPopularProperties = createAsyncThunk(
  "Popular/loadProperties",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPopularProperties();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const PopularSlice = createSlice({
  name: "Popular",
  initialState: {
    properties: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPopular: (state) => {
      state.properties = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPopularProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPopularProperties.fulfilled, (state, action) => {
        state.properties = action.payload;
        state.loading = false;
      })
      .addCase(loadPopularProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPopular } = PopularSlice.actions;
export default PopularSlice.reducer;
