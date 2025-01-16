// import axios from "axios";

// export const fetchAgents = async () => {
//   const response = await axios.get(`/api/agents`);
//   return response.data;
// };

import axios from "axios";

export const fetchAgents = async () => {
  const response = await axios.get("https://api.flatty.ai/agents");
  return response.data;
};

export const fetchAgent = async (id) => {
  const response = await axios.get(`https://api.flatty.ai/agents/${id}`);
  return response.data;
};
