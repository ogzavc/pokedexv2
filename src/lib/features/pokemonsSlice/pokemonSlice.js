import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axiosInstance";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (url = `/pokemon/?limit=36`, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
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
        state.error = null;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = {
          message: action.payload || action.error.message,
          id: new Date().getTime(),
        };
      });
  },
});

export default pokemonsSlice.reducer;
