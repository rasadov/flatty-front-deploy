import axios from "axios";

export const fetchPopularProperties = async () => {
  const response = await axios.get("https://api.flatty.ai/api/v1/property/", {
    params: {
      page: 2,
      elements: 5,
    },
  });
  return response.data;
};
