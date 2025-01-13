// import axios from "axios";

// export const fetchAgents = async () => {
//   const response = await axios.get(`/api/agents`);
//   return response.data;
// };

import axios from "axios";

export const fetchAgents = async () => {
  const response = await axios.get("http://localhost:5001/agents");
  return response.data;
};

export const fetchAgent = async (id) => {
  const response = await axios.get(`http://localhost:5001/agents/${id}`);
  return response.data;
};
