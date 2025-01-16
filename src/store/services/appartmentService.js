// import axios from "axios";

// export const fetchApartmentDetails = async (apartmentId) => {
//   const response = await axios.get(`/api/apartments/${apartmentId}`);
//   return response.data;
// };
// import { apartmentData } from "../../appartmentData";

// export const fetchApartmentDetails = (apartmentId) => {
//   const apartment = apartmentData.find((item) => item.id === apartmentId);
//   if (!apartment) {
//     throw new Error("Apartment not found");
//   }
//   return apartment;
// };

import axios from "axios";

export const fetchApartmentDetails = async (apartmentId) => {
  const response = await axios.get(
    `https://api.flatty.ai/api/v1/property/record/${apartmentId}`
  );
  return response.data;
};
