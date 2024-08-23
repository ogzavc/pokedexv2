import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (url = `/pokemon/?limit=1000`, { getState }) => {
    const state = getState();
    const list = state.pokemonSearch.data;

    if (list?.length > 0) {
      return list;
    } else {
      const response = await axiosInstance.get(url);
      return response.data;
    }
  }
);

const pokemonSearchSlice = createSlice({
  name: "pokemonSearch",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        console.log(state.data);
        state.status = "loading";
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.results;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default pokemonSearchSlice.reducer;
