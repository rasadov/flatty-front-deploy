import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: JSON.parse(localStorage.getItem("wishlist") || "[]") || [], // Initialize wishlist from local storage
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Persist to local storage
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Persist to local storage
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist)); // Persist to local storage
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
