import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import searchReducer from "./slices/searchSlice";
import featuredReducer from "./slices/featuredSlice";
import popularReducer from "./slices/popularSlice";
import agentReducer from "./slices/agentSlice";
import authReducer from "./slices/authSlice";
import complexReducer from "./slices/complexSlice";
import wishlistReducer from "./slices/wishlistSlice";
import agentPostReducer from "./slices/agentPostSlice";
import apartmentReducer from "./slices/appartmentSlice";
const store = configureStore({
  reducer: {
    filter: filterReducer,
    search: searchReducer,
    featured: featuredReducer,
    popular: popularReducer,
    apartment: apartmentReducer,
    agent: agentReducer,
    auth: authReducer,
    complex: complexReducer,
    wishlist: wishlistReducer,
    posts: agentPostReducer,
  },
});

export default store;
