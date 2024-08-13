import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemonDetails = createAsyncThunk(
  "pokemonDetails/fetchPokemonDetails",
  async (name, { getState }) => {
    const state = getState();
    const existingPokemon = selectPokemonByName(state, name);

    if (existingPokemon) {
      return { name, data: existingPokemon.data };
    }

    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return { name, data: response.data };
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
      })
      .addCase(fetchPokemonDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectPokemonByName = (state, name) =>
  state.pokemonDetails.details.find((pokemon) => pokemon.name === name);

export default pokemonDetailsSlice.reducer;
