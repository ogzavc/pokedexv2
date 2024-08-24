import { useAppSelector } from "@/lib/hooks";
import { selectPokemonByName } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";

export const usePokemonDetails = (name) => {
  return useAppSelector((state) => selectPokemonByName(state, name));
};
