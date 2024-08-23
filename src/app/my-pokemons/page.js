"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { fetchPokemons } from "@/lib/features/pokemonsSlice/pokemonSlice";
import { fetchPokemonDetails } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { myFavoritePokemons } from "@/utils/helpers";
import { PokeCard, BackButton } from "@/components";
import styles from "./styles.module.css";

export default function MyPokemons() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pokemons = myFavoritePokemons();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (pokemons.length) {
      Promise.all(
        pokemons.map((name) => dispatch(fetchPokemonDetails(name)))
      ).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [pokemons, dispatch]);

  const handleCardClick = (pokemonName) => {
    router.push(`/details/${pokemonName}`);
  };

  return (
    <main className={styles.myPokemons}>
      <div className={styles.myPokemonsHeader}>
        <BackButton />
      </div>

      {isLoading ? (
        <div className={styles.myPokemonsWrapper}>
          {Array.from({ length: 12 }).map((_, index) => (
            <PokeCard key={index} isLoading={isLoading} />
          ))}
        </div>
      ) : pokemons.length > 0 ? (
        <div className={styles.myPokemonsWrapper}>
          {pokemons.map((name) => (
            <PokeCard
              key={name}
              pokemonName={name}
              onClick={() => handleCardClick(name)}
              isLoading={false}
            />
          ))}
        </div>
      ) : (
        <div className={styles.myPokemonsNotFound}>
          There are no Pokémon here... Go to the details click the like button
          on the top right to collect one!
        </div>
      )}
    </main>
  );
}
