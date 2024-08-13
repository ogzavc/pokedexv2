import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "./features/pokemonsSlice/pokemonSlice";
import pokemonDetailsSlice from "./features/pokemonDetailsSlice/pokemonDetailsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pokemons: pokemonsSlice,
      pokemonDetails: pokemonDetailsSlice,
    },
  });
};
