"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { fetchPokemons } from "../lib/features/pokemonsSlice/pokemonSlice";
import { fetchPokemonDetails } from "../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import styles from "./page.module.css";
import PokeCard from "../components/PokeCard";
import { NavigateBeforeIcon, NavigateNextIcon } from "../components/Icons";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const nextPageUrl = useSelector((state) => state.pokemons.nextPageUrl);
  const prevPageUrl = useSelector((state) => state.pokemons.prevPageUrl);
  const pokemons = useSelector((state) => state.pokemons.data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  useEffect(() => {
    if (pokemons.length) {
      Promise.all(
        pokemons.map((poke) => dispatch(fetchPokemonDetails(poke.name)))
      ).then(() => setIsLoading(false));
    }
  }, [pokemons, dispatch]);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setIsLoading(true);
      dispatch(fetchPokemons(nextPageUrl));
    }
  };

  const handlePrevPage = () => {
    if (prevPageUrl) {
      setIsLoading(true);
      dispatch(fetchPokemons(prevPageUrl));
    }
  };

  const handleCardClick = (pokemonName) => {
    router.push(`/details/${pokemonName}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.homeWrapper}>
        {!isLoading &&
          pokemons.map((poke) => (
            <PokeCard
              key={poke.name}
              pokemonName={poke.name}
              onClick={() => handleCardClick(poke.name)}
            />
          ))}
      </div>

      <div className={styles.pagination}>
        <Button
          color="inherit"
          variant="outlined"
          onClick={handlePrevPage}
          disabled={!prevPageUrl || isLoading}
        >
          <NavigateBeforeIcon /> Previous
        </Button>

        <Button
          color="inherit"
          variant="outlined"
          onClick={handleNextPage}
          disabled={!nextPageUrl || isLoading}
        >
          <NavigateNextIcon /> Next
        </Button>
      </div>
    </main>
  );
}
