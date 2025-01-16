import axios from "axios";

export const fetchPopularProperties = async () => {
  const response = await axios.get(
    "https://flatty.abyssara.tech/api/v1/property",
    {
      params: {
        page: 2,
        elements: 10,
      },
    }
  );
  return response.data;
};
