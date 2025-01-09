import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAgents, fetchAgent } from "../services/agentService";

// Thunk to load all agents
export const loadAgents = createAsyncThunk(
  "agent/loadAgents",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAgents();
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

// Thunk to load a single agent by ID
export const loadAgentById = createAsyncThunk(
  "agent/loadAgentById",
  async (id, { rejectWithValue }) => {
    try {
      return await fetchAgent(id);
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
      });
    }
  }
);

const initialState = {
  agents: {}, // Normalized data structure
  allIds: [],
  currentAgent: null,
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    clearAgents: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadAgents.fulfilled, (state, action) => {
        state.allIds = action.payload.map((agent) => agent.id);
        state.agents = action.payload.reduce((acc, agent) => {
          acc[agent.id] = agent;
          return acc;
        }, {});
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
