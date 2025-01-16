// import axios from "axios";

// export const fetchFeaturedProperties = async () => {
//   const response = await axios.get(`/api/featured`);
//   return response.data;
// };
import axios from "axios";

export const fetchFeaturedProperties = async () => {
  const response = await axios.get(
    "https://flatty.abyssara.tech/api/v1/property/",
    {
      params: {
        page: 1,
        elements: 10,
      },
    }
  );
  return response.data;
};
