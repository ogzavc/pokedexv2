"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks";
import { fetchPokemonsByType } from "@/lib/features/pokemonsByTypeSlice/pokemonsByTypeSlice";
import { fetchPokemonDetails } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { PokeCard, Skeleton, Button } from "@/components";
import { NavigateBeforeIcon } from "@/components/Icons";
import styles from "./styles.module.css";

export default function TypeList() {
  const { type } = useParams();
  const router = useRouter();
  const { data: pokemons, status } = useSelector(
    (state) => state.pokemonsByType
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchPokemonsByType(type));
  }, [dispatch, type]);

  useEffect(() => {
    if (pokemons?.length && status === "succeeded") {
      Promise.all(
        pokemons.map(({ pokemon }) =>
          dispatch(fetchPokemonDetails(pokemon.name))
        )
      ).then(() => {
        setIsLoading(false);
      });
    }
  }, [pokemons, status, dispatch]);

  const handleCardClick = (pokemonName) => {
    router.push(`/details/${pokemonName}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <main className={styles.main}>
      <div className={styles.typeHeader}>
        <Button color="inherit" variant="outlined" onClick={handleBackClick}>
          <NavigateBeforeIcon />
        </Button>
      </div>

      <div className={styles.typeWrapper}>
        {isLoading
          ? Array.from({ length: 24 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                width={"100%"}
                height={isMobile ? 120 : 150}
              />
            ))
          : pokemons.map(({ pokemon }) => (
              <PokeCard
                key={pokemon.name}
                pokemonName={pokemon.name}
                onClick={() => handleCardClick(pokemon.name)}
              />
            ))}
      </div>
    </main>
  );
}
