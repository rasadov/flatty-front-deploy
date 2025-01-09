import axios from "axios";

export const fetchPopularProperties = async () => {
  const response = await axios.get("http://localhost:5050/popularProperties");
  return response.data;
};
