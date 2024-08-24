"use client";
import { useEffect, useState, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import {
  fetchPokemons,
  selectPokemons,
  selectNextPageUrl,
  selectPrevPageUrl,
  fetchPokemonDetails,
  resetPokemonsByType,
} from "@/lib/features";
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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const nextPageUrl = useAppSelector(selectNextPageUrl);
  const prevPageUrl = useAppSelector(selectPrevPageUrl);
  const pokemons = useAppSelector(selectPokemons) || Array.from({ length: 24 });

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

  const handleNextPage = useCallback(() => {
    if (nextPageUrl) {
      setIsLoading(true);
      dispatch(fetchPokemons(nextPageUrl));
    }
  }, [nextPageUrl, dispatch]);

  const handlePrevPage = useCallback(() => {
    if (prevPageUrl) {
      setIsLoading(true);
      dispatch(fetchPokemons(prevPageUrl));
    }
  }, [prevPageUrl, dispatch]);

  const handleCardClick = useCallback(
    (pokemonName) => {
      router.push(`/details/${pokemonName}`);
    },
    [router]
  );

  const handleTypeSelect = useCallback(
    (type) => {
      dispatch(resetPokemonsByType());
      router.push(`/type/${type}`);
    },
    [dispatch, router]
  );

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
