import { useDispatch, useSelector, useStore } from "react-redux";
import { usePokemonDetails } from "@/lib/hooks/usePokemonDetails";

export { usePokemonDetails };
export const useAppDispatch = useDispatch.withTypes();
export const useAppSelector = useSelector.withTypes();
export const useAppStore = useStore.withTypes();
