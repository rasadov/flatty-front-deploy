import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgents } from "../services/agentService";

// Thunk to load all agents
export const loadAgents = createAsyncThunk(
  "agent/loadAgents",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAgents();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to load a single agent by ID
export const loadAgentById = createAsyncThunk(
  "agent/loadAgentById",
  async (id, { getState, rejectWithValue }) => {
    try {
      const agents = getState().agent.agents;
      console.log("Agents in state:", agents); // Check if the agents are correctly populated
      const agent = agents.find((agent) => agent.id === id);
      if (!agent) {
        return rejectWithValue("Agent not found");
      }
      return agent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    currentAgent: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAgents: (state) => {
      state.agents = [];
      state.currentAgent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAgents.fulfilled, (state, action) => {
        state.agents = action.payload;
        state.loading = false;
      })
      .addCase(loadAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAgentById.fulfilled, (state, action) => {
        state.currentAgent = action.payload;
        state.loading = false;
      })
      .addCase(loadAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAgents } = agentSlice.actions;
export default agentSlice.reducer;
