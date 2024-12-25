import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import featuredReducer from "./slices/featuredSlice";
import apartmentReducer from "./slices/appartmentSlice";
import agentReducer from "./slices/agentSlice";

const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    featured: featuredReducer,
    apartment: apartmentReducer,
    agent: agentReducer,
  },
});

export default store;
