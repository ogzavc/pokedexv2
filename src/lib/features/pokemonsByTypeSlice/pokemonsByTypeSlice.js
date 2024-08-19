import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

// Thunk for fetching Pokémon data by type
export const fetchPokemonsByType = createAsyncThunk(
  "pokemon/fetchPokemonsByType",
  async (type) => {
    const response = await axiosInstance.get(`/type/${type}`);
    return response.data;
  }
);

const pokemonsByTypeSlice = createSlice({
  name: "pokemonsByType",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetPokemonsByType(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonsByType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonsByType.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.pokemon;
      })
      .addCase(fetchPokemonsByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetPokemonsByType } = pokemonsByTypeSlice.actions;
export default pokemonsByTypeSlice.reducer;
