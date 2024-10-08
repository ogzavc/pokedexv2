import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

export const fetchPokemonDetails = createAsyncThunk(
  "pokemonDetails/fetchPokemonDetails",
  async (name, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const existingPokemon = selectPokemonByName(state, name);

      if (existingPokemon) {
        return { name, data: existingPokemon.data };
      }

      const response = await axiosInstance.get(`/pokemon/${name}`);
      return { name, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState: {
    details: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        const { name, data } = action.payload;
        state.status = "succeeded";
        const existingPokemon = state.details.find(
          (pokemon) => pokemon.name === name
        );
        if (!existingPokemon) {
          state.details.push({ name, data });
        }
        state.error = null;
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          message: action.payload || action.error.message,
          id: new Date().getTime(),
        };
      });
  },
});

export const selectPokemonByName = (state, name) =>
  state.pokemonDetails.details.find((pokemon) => pokemon.name === name);
export const selectPokemonDetailsStatus = (state) =>
  state.pokemonDetails.status;
export const selectPokemonDetailsError = (state) => state.pokemonDetails.error;

export default pokemonDetailsSlice.reducer;
