// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./authSlice";

// Assuming you have an API for authentication
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setUser(data.user)); // data.user could be { id, email, name, role }
      return data.user;
    } else {
      throw new Error(data.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch }) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setUser(data.user));
      return data.user;
    } else {
      throw new Error(data.message || "Registration failed");
    }
  }
);
