// import axios from "axios";

// export const fetchFeaturedProperties = async () => {
//   const response = await axios.get(`/api/featured`);
//   return response.data;
// };
import axios from "axios";

export const fetchFeaturedProperties = async () => {
  const response = await axios.get("http://localhost:5050/featuredProperties");
  return response.data;
};
