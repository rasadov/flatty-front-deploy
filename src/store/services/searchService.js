// import axios from "axios";

export const fetchSearchResults = async (filters) => {
  const response = await axios.post(`"http://localhost:5001/api/v1/property`, filters);
  return response.data;
};
