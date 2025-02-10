import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/agentPostService";

// Асинхронное получение постов
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postService.getPosts();
  return response.data;
});

// Асинхронное создание нового поста
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formDataToSend, { rejectWithValue }) => {
    const response = await fetch("https://api.flatty.ai/api/v1/property/create", {
      method: "POST",
      body: formDataToSend,
      credentials: "include", // если сервер использует cookies
      headers: {
        // Не устанавливайте Content-Type для multipart, пусть браузер сам определит его
        Accept: "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return rejectWithValue({
        status: response.status,
        message: errorData.detail || "Failed to create property.",
      });
    }
    const data = await response.json();
    return data;
  }
);

// Асинхронное обновление поста (редактирование)
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (formDataToSend, { rejectWithValue }) => {
    const response = await fetch("https://api.flatty.ai/api/v1/property/update", {
      method: "PATCH", // или PUT, в зависимости от вашего API
      body: formDataToSend,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return rejectWithValue({
        status: response.status,
        message: errorData.detail || "Failed to update property.",
      });
    }
    const data = await response.json();
    return data;
  }
);

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
      // fetchPosts cases
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
      // addPost case
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      // updatePost case: находим пост по id и обновляем его
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default agentPostSlice.reducer;