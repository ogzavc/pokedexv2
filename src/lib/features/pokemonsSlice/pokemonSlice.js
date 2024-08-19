import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

// Thunk for fetching Pokémon data
export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await axiosInstance.get(`/pokemon/?limit=36`);
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
