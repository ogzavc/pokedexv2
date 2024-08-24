import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

export const fetchPokemonsByType = createAsyncThunk(
  "pokemon/fetchPokemonsByType",
  async (type, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/type/${type}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
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
      state.status = "idle";
      state.data = [];
      state.error = null;
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
        state.error = null;
      })
      .addCase(fetchPokemonsByType.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          message: action.payload || action.error.message,
          id: new Date().getTime(),
        };
      });
  },
});

export const selectPokemonsByType = (state) => state.pokemonsByType.data;
export const selectPokemonsByTypeStatus = (state) =>
  state.pokemonsByType.status;
export const selectPokemonsByTypeError = (state) => state.pokemonsByType.error;

export const { resetPokemonsByType } = pokemonsByTypeSlice.actions;
export default pokemonsByTypeSlice.reducer;
