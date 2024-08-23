import { configureStore } from "@reduxjs/toolkit";
import pokemonsSlice from "./features/pokemonsSlice/pokemonSlice";
import pokemonsByTypeSlice from "./features/pokemonsByTypeSlice/pokemonsByTypeSlice";
import pokemonDetailsSlice from "./features/pokemonDetailsSlice/pokemonDetailsSlice";
import pokemonSearchSlice from "./features/pokemonSearchSlice/pokemonSearchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pokemons: pokemonsSlice,
      pokemonsByType: pokemonsByTypeSlice,
      pokemonDetails: pokemonDetailsSlice,
      pokemonSearch: pokemonSearchSlice,
    },
  });
};
