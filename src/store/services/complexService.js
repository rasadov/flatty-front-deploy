import axios from "axios";

export const fetchComplexDetails = async () => {
  const response = await axios.get(`http://localhost:5050/complexDetails`);
  return response.data;
};

export const fetchComplexById = async (complexId) => {
  const response = await axios.get(
    `http://localhost:5050/complexDetails/${complexId}`
  );
  return response.data;
};
