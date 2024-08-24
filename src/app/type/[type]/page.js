"use client";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import {
  fetchPokemonDetails,
  fetchPokemonsByType,
  selectPokemonsByType,
  selectPokemonsByTypeStatus,
} from "@/lib/features";
import { PokeCard, BackButton, Skeleton } from "@/components";
import styles from "./styles.module.css";

export default function TypeList() {
  const { type } = useParams();
  const router = useRouter();

  const pokemons = useAppSelector(selectPokemonsByType);
  const status = useAppSelector(selectPokemonsByTypeStatus);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
    } else if (pokemons?.length === 0 && status === "succeeded") {
      setIsLoading(false);
    }
  }, [pokemons, status, dispatch]);

  const handleCardClick = useCallback(
    (pokemonName) => {
      router.push(`/details/${pokemonName}`);
    },
    [router]
  );

  return (
    <main className={styles.main}>
      <div className={styles.typeHeader}>
        <BackButton />
      </div>
      <div className={styles.typeTitleWrapper}>
        <div className={styles.typeTitle}>{type}</div>

        {isLoading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            width={300}
            height={20}
          />
        ) : (
          <div>{pokemons.length} Pokemons Found</div>
        )}
      </div>

      <div className={styles.typeWrapper}>
        {pokemons.map(({ pokemon }) => (
          <PokeCard
            key={pokemon.name}
            pokemonName={pokemon.name}
            onClick={() => handleCardClick(pokemon.name)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </main>
  );
}
