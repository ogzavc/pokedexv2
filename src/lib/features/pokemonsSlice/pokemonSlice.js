import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching Pokémon data
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (url = "https://pokeapi.co/api/v2/pokemon/?limit=36") => {
    const response = await axios.get(url);
    return response.data;
  }
);

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    data: [],
    nextPageUrl: null,
    prevPageUrl: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.results;
        state.nextPageUrl = action.payload.next;
        state.prevPageUrl = action.payload.previous;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pokemonsSlice.reducer;
