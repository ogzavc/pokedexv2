"use client";
import styles from "./page.module.css";
import PokeCard from "../components/PokeCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../lib/features/pokemonsSlice/pokemonSlice";
import { fetchPokemonDetails } from "../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const nextPageUrl = useSelector((state) => state.pokemons.nextPageUrl);
  const prevPageUrl = useSelector((state) => state.pokemons.prevPageUrl);
  const pokemons = useSelector((state) => state.pokemons.data);
  const pokemonDetails = useSelector((state) => state.pokemonDetails.details);
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

  return (
    <main className={styles.main}>
      <div className={styles.homeWrapper}>
        {!isLoading &&
          pokemons.map((poke) => (
            <PokeCard key={poke.name} pokemonName={poke.name} />
          ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={!prevPageUrl}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!nextPageUrl}>
          Next
        </button>
      </div>
    </main>
  );
}
