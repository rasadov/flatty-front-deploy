import axios from "axios";

export const fetchComplexDetails = async () => {
  const response = await axios.get(`https://flatty.abyssara.tech/api/v1/listing/page/`,
  {
    params: {
      page: 1,
      elements: 10,
    },
  });
  return response.data;
};

export const fetchComplexById = async (complexId) => {
  const response = await axios.get(
    `https://flatty.abyssara.tech/api/v1/listing/record/${complexId}`
  );
  return response.data;
};
