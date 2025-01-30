import axios from "axios";

export const fetchPopularProperties = async () => {
  const response = await axios.get("https://api.flatty.ai/api/v1/property/popular", {
    params: {
      page: 1,
      elements: 5,
    },
  });
  console.log("popularPropertiespopularProperties >>>>>>", response);
  return response.data;
};
