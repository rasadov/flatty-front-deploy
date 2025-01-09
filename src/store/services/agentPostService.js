import axios from "axios";

const API_URL = "http://localhost:5050/posts";

const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response;
};

const addPost = async (newPost) => {
  const response = await axios.post(API_URL, newPost);
  return response;
};

const postService = {
  getPosts,
  addPost,
};

export default postService;
