import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchPokemonList",
  async (url = `/pokemon/?limit=1302`, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const list = state.pokemonSearch.data;

      if (list?.length > 0) {
        return list;
      } else {
        const response = await axiosInstance.get(url);
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
        state.status = "loading";
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.results;
        state.error = null;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          message: action.payload || action.error.message,
          id: new Date().getTime(),
        };
      });
  },
});

export const selectPokemonList = (state) => state.pokemonSearch.data;
export const selectPokemonListStatus = (state) => state.pokemonSearch.status;
export const selectPokemonListError = (state) => state.pokemonSearch.error;

export default pokemonSearchSlice.reducer;
