import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areaFrom: "",
  areaTo: "",
  renovation: [],
  floorFrom: "",
  floorTo: "",
  ceilingHeight: "",
  bathroom: "",
  furniture: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setAreaFrom: (state, action) => {
      state.areaFrom = action.payload;
    },
    setAreaTo: (state, action) => {
      state.areaTo = action.payload;
    },
    setRenovation: (state, action) => {
      state.renovation = action.payload;
    },
    setFloorFrom: (state, action) => {
      state.floorFrom = action.payload;
    },
    setFloorTo: (state, action) => {
      state.floorTo = action.payload;
    },
    setCeilingHeight: (state, action) => {
      state.ceilingHeight = action.payload;
    },
    setBathroom: (state, action) => {
      state.bathroom = action.payload;
    },
    setFurniture: (state, action) => {
      const index = state.furniture.indexOf(action.payload);
      if (index > -1) {
        state.furniture.splice(index, 1);
      } else {
        state.furniture.push(action.payload);
      }
    },
    clearFilters: () => initialState,
  },
});

export const {
  setAreaFrom,
  setAreaTo,
  setRenovation,
  setFloorFrom,
  setFloorTo,
  setCeilingHeight,
  setBathroom,
  setFurniture,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
