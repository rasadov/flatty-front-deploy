import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchComplexDetails,
  fetchComplexById,
} from "../services/complexService";

export const loadComplexDetails = createAsyncThunk(
  "complex/loadAllDetails",
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetching complex details');
      return await fetchComplexDetails();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadComplexById = createAsyncThunk(
  "complex/loadById",
  async (complexId, { rejectWithValue }) => {
    try {
      return await fetchComplexById(complexId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  complexDetails: [],
  currentComplex: null,
  loading: false,
  error: null,
};

const complexSlice = createSlice({
  name: "complex",
  initialState,
  reducers: {
    clearComplex: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComplexDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadComplexDetails.fulfilled, (state, action) => {
        state.complexDetails = action.payload;
        state.loading = false;
      })
      .addCase(loadComplexDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadComplexById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadComplexById.fulfilled, (state, action) => {
        state.currentComplex = action.payload;
        state.loading = false;
      })
      .addCase(loadComplexById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearComplex } = complexSlice.actions;
export default complexSlice.reducer;
