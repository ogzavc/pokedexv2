"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchPokemons } from "@/lib/features/pokemonsSlice/pokemonSlice";
import { fetchPokemonDetails } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { resetPokemonsByType } from "@/lib/features/pokemonsByTypeSlice/pokemonsByTypeSlice";
import { typeOptions } from "@/utils/constants";
import {
  PokeCard,
  Button,
  Autocomplete,
  TextField,
  SearchInput,
} from "@/components";
import { NavigateBeforeIcon, NavigateNextIcon } from "@/components/Icons";
import styles from "./styles.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const nextPageUrl = useSelector((state) => state.pokemons.nextPageUrl);
  const prevPageUrl = useSelector((state) => state.pokemons.prevPageUrl);
  const pokemons = useSelector(
    (state) => state.pokemons.data || Array.from({ length: 24 })
  );
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

  const handleTypeSelect = (type) => {
    dispatch(resetPokemonsByType());
    router.push(`/type/${type}`);
  };

  return (
    <main className={styles.main}>
      <div className={styles.filtersWrapper}>
        <div className={styles.searchFilter}>
          <SearchInput onSelect={handleCardClick} />
        </div>

        <Autocomplete
          id="type-filter-input"
          onChange={(event, newValue) => {
            handleTypeSelect(newValue.id);
          }}
          className={styles.typeFilter}
          options={typeOptions}
          renderInput={(params) => (
            <TextField {...params} label="Select a type" />
          )}
        />
      </div>

      <div className={styles.homeWrapper}>
        {pokemons.map((poke) => (
          <PokeCard
            key={poke?.name}
            pokemonName={poke?.name}
            onClick={() => handleCardClick(poke?.name)}
            isLoading={isLoading}
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
