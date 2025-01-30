// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "./authSlice";
import { toast } from "react-toastify";

// Assuming you have an API for authentication
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch }) => {
    const response = await fetch("https://api.flatty.ai/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    console.log("RESPONSE ", response);
  
    const data = await response.json();
    console.log("DATA ", data);
    
    localStorage.setItem("user", data);
    console.log("DATA ", data);
    
    if (response.ok) {
      dispatch(setUser(data));
      return data;
    } else {
      toast.error(data.message || "Login failed");
      throw new Error(data.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch }) => {
    console.log("userData", userData);
    const response = await fetch("https://api.flatty.ai/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });
    const data = await response.json();
    localStorage.setItem("user", data);
    if (response.ok) {
      dispatch(setUser(data));
      return data;
    } else {
      toast.error(data.message || "Registration failed");
      throw new Error(data.message || "Registration failed");
    }
  }
);
