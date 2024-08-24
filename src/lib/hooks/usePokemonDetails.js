import { useAppSelector } from "@/lib/hooks";
import { selectPokemonByName } from "@/lib/features";

export const usePokemonDetails = (name) => {
  return useAppSelector((state) => selectPokemonByName(state, name));
};
