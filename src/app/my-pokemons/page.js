"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { fetchPokemons } from "@/lib/features/pokemonsSlice/pokemonSlice";
import { fetchPokemonDetails } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { myFavoritePokemons } from "@/utils/helpers";
import styles from "./page.module.css";
import PokeCard from "@/components/PokeCard";

export default function MyPokemons() {
  const dispatch = useDispatch();
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
    }
  }, [pokemons, dispatch]);

  const handleCardClick = (pokemonName) => {
    router.push(`/details/${pokemonName}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.homeWrapper}>
        {!isLoading &&
          pokemons.map((name) => (
            <PokeCard
              key={name}
              pokemonName={name}
              onClick={() => handleCardClick(name)}
            />
          ))}
      </div>
    </main>
  );
}
