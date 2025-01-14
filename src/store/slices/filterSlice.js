import { createSlice, createAction } from "@reduxjs/toolkit";

// Generic actions for filter manipulation
export const setValue = createAction("filter/SET_VALUE", (path, value) => ({
  payload: { path, value },
}));
export const toggleValue = createAction("filter/TOGGLE_VALUE", (path) => ({
  payload: { path },
}));
export const incrementValue = createAction(
  "filter/INCREMENT_VALUE",
  (path) => ({
    payload: { path },
  })
);
export const decrementValue = createAction(
  "filter/DECREMENT_VALUE",
  (path) => ({
    payload: { path },
  })
);
export const clearAllFilters = createAction("filter/CLEAR_ALL_FILTERS");

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
    builder.addMatcher(
      (action) => action.type.startsWith("filter/"),
      (state, action) => {
        const { path, value } = action.payload;
        const parts = path.split(".");
        let current = state;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        const lastKey = parts[parts.length - 1];

        switch (action.type) {
          case setValue.type:
            current[lastKey] = value;
            break;
          case toggleValue.type:
            current[lastKey] = !current[lastKey];
            break;
          case incrementValue.type:
            current[lastKey] = Math.max(0, current[lastKey] + 1);
            break;
          case decrementValue.type:
            current[lastKey] = Math.max(0, current[lastKey] - 1);
            break;
          case clearAllFilters.type:
            return initialState;
        }
      }
    );
  },
});

export default filterSlice.reducer;

// Helper functions for dispatching actions (Assuming you're using these in your components)
export const setFilter = (dispatch) => (path, value) =>
  dispatch(setValue(path, value));
export const toggleFilter = (dispatch) => (path) => dispatch(toggleValue(path));
export const incrementFilter = (dispatch) => (path) =>
  dispatch(incrementValue(path));
export const decrementFilter = (dispatch) => (path) =>
  dispatch(decrementValue(path));
export const clearFilters = (dispatch) => () => dispatch(clearAllFilters());
