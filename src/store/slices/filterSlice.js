import { createSlice, createAction } from "@reduxjs/toolkit";

// Create generic actions for setting and clearing values
export const setValue = createAction("SET_VALUE", (path, value) => ({
  payload: { path, value },
}));
export const toggleValue = createAction("TOGGLE_VALUE", (path) => ({
  payload: { path },
}));
export const incrementValue = createAction("INCREMENT_VALUE", (path) => ({
  payload: { path },
}));
export const decrementValue = createAction("DECREMENT_VALUE", (path) => ({
  payload: { path },
}));
export const clearAllFilters = createAction("CLEAR_ALL_FILTERS");

const initialState = {
  category: "",
  complex: "",
  area: { from: "", to: "" },
  renovation: [],
  floor: { from: "", to: "" },
  ceilingHeight: "",
  bathroom: { type: "", count: 0 },
  furniture: [],
  rooms: {
    rooms: 0,
    livingRoom: 0,
    bedroom: 0,
    balcony: 0,
  },
  parkingSlot: false,
  swimmingPool: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setValue, (state, { payload: { path, value } }) => {
        const parts = path.split(".");
        let obj = state;
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = value;
      })
      .addCase(toggleValue, (state, { payload: { path } }) => {
        const parts = path.split(".");
        let obj = state;
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = !obj[parts[parts.length - 1]];
      })
      .addCase(incrementValue, (state, { payload: { path } }) => {
        const parts = path.split(".");
        let obj = state;
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = Math.max(
          0,
          obj[parts[parts.length - 1]] + 1
        );
      })
      .addCase(decrementValue, (state, { payload: { path } }) => {
        const parts = path.split(".");
        let obj = state;
        for (let i = 0; i < parts.length - 1; i++) {
          obj = obj[parts[i]];
        }
        obj[parts[parts.length - 1]] = Math.max(
          0,
          obj[parts[parts.length - 1]] - 1
        );
      })
      .addCase(clearAllFilters, () => initialState);
  },
});

export const { actions } = filterSlice;
export default filterSlice.reducer;

// Helper functions for dispatching actions
export const setFilter = (path, value) => dispatch(setValue(path, value));
export const toggleFilter = (path) => dispatch(toggleValue(path));
export const incrementFilter = (path) => dispatch(incrementValue(path));
export const decrementFilter = (path) => dispatch(decrementValue(path));
export const clearFilters = () => dispatch(clearAllFilters());
