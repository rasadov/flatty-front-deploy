// import axios from "axios";

// export const fetchAgents = async () => {
//   const response = await axios.get(`/api/agents`);
//   return response.data;
// };

import { agentData } from "../../agentData";

// Fetch all agents
export const fetchAgents = () => {
  console.log(agentData);
  return agentData;
};

// Fetch a single agent by ID
export const fetchAgent = (id) => {
  return agentData.find((agent) => agent.id === id); // Find the agent by ID
};
