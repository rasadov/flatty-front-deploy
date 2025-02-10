import axios from "axios";

const API_URL = "https://api.flatty.ai/api/v1/property/";
const CREATE_URL = "https://api.flatty.ai/api/v1/property/create/";

const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response;
};

const addPost = async (newPost) => {
  const response = await axios.post(CREATE_URL, newPost,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response;
};

const postService = {
  getPosts,
  addPost,
};

export default postService;
