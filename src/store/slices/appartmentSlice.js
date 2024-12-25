import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApartmentDetails } from "../services/apartmentService";

export const loadApartmentDetails = createAsyncThunk(
  "apartment/loadDetails",
  async (apartmentId, { rejectWithValue }) => {
    try {
      return await fetchApartmentDetails(apartmentId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  id: null,
  title: "",
  propertyDetails: {},
  description: "",
  loading: false,
  error: null,
};

const apartmentSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
    clearApartment: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadApartmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadApartmentDetails.fulfilled, (state, action) => {
        return { ...state, ...action.payload, loading: false };
      })
      .addCase(loadApartmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
export default apartmentSlice.reducer;
