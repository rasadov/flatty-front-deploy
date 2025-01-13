import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/agentPostService";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postService.getPosts();
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (formDataToSend) => {
  const response = await fetch('http://localhost:5001/api/v1/property/create', {
    method: 'POST',
    body: formDataToSend,
    credentials: 'include',
  });
  return response.data;
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
