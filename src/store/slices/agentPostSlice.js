import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/agentPostService";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postService.getPosts();
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (formDataToSend) => {
  const response = fetch("https://api.flatty.ai/api/v1/property/create", {
    method: "POST",
    body: formDataToSend,
    credentials: "include", // if your server sets/needs cookies
    headers: {
      // Let the browser set 'Content-Type' for multipart
      Accept: "application/json",

      // If your backend requires a Bearer token:
      "Authorization": `Bearer }`,
    },
  });
  if (!response.ok) {
    // Attempt to parse error message
    const errorData = await response.json().catch(() => ({}));
    return rejectWithValue({
      status: response.status,
      message: errorData.detail || "Failed to create property.",
    });
  }

  // Parse JSON if backend returns JSON
  const data = await response.json();
  return data;
});

const agentPostSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export default agentPostSlice.reducer;
