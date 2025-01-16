// import axios from "axios";

export const fetchSearchResults = async (filters) => {
  const response = await axios.post(`"https://flatty.abyssara.tech/api/v1/property`, filters);
  return response.data;
};
