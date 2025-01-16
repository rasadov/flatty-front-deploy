import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchApartmentDetails = createAsyncThunk(
  "apartment/fetchDetails",
  async (apartmentId, { rejectWithValue }) => {
    console.log("Fetching apartment with ID:", apartmentId);
    try {
      const response = await axios.get(
        `https://flatty.abyssara.tech/api/v1/property/record/${apartmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Fetch error:", error);
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  id: null,
  title: "",
  propertyDetails: {
    rooms: 0, // Default values for properties that might not come from the API
    area: 0,
    livingArea: 0,
    kitchenArea: 0,
    currFloor: 0,
    building: 0,
    yearBuilt: "",
  },
  description: "",
  price: "",
  images: [],
  location: {
    latitude: null,
    longitude: null,
  },
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
      .addCase(fetchApartmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApartmentDetails.fulfilled, (state, action) => {
        // Merge the new data with existing state to preserve defaults for missing properties
        return {
          ...state,
          ...action.payload,
          propertyDetails: {
            ...state.propertyDetails,
            ...action.payload.propertyDetails,
          },
          loading: false,
        };
      })
      .addCase(fetchApartmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Optionally, you could reset to initial state or keep the last known good state
      });
  },
});

export const { clearApartment } = apartmentSlice.actions;
export default apartmentSlice.reducer;
