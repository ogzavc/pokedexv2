"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Autocomplete, TextField } from "@/components";
import styles from "./styles.module.css";
import useDebounce from "@/hooks/useDebounce";
import { fetchPokemonList } from "@/lib/features/pokemonSearchSlice/pokemonSearchSlice";

export default function SearchInput({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [noOptionText, setNoOptionText] = useState("Start typing to search");
  const debouncedInputValue = useDebounce(inputValue, 600);
  const [dynamicOptions, setDynamicOptions] = useState([]);
  const dispatch = useAppDispatch();

  const pokemonList = useAppSelector((state) => state.pokemonSearch?.data);
  const status = useAppSelector((state) => state.pokemonSearch?.status);

  useEffect(() => {
    const handleFetchPokemonList = () => {
      dispatch(fetchPokemonList());
    };

    if (debouncedInputValue && pokemonList.length === 0) {
      if (pokemonList.length === 0) {
        handleFetchPokemonList();
      }
    } else {
      resetSearchState();
    }
  }, [debouncedInputValue, pokemonList.length, dispatch]);

  useEffect(() => {
    setNoOptionText("Searching...");
    const filterPokemonList = () => {
      const filteredOptions = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
      );

      if (filteredOptions.length > 0) {
        setDynamicOptions(filteredOptions);
      } else {
        setDynamicOptions([]);
        if (status === "succeeded") {
          setNoOptionText("No Pokémon found");
        }
      }
    };

    if (debouncedInputValue) {
      filterPokemonList();
    } else {
      resetSearchState();
    }
  }, [pokemonList, debouncedInputValue, status]);

  const resetSearchState = () => {
    setDynamicOptions([]);
    setNoOptionText("Start typing to search");
  };

  return (
    <Autocomplete
      className={styles.searchInput}
      id="dynamic-filter-input"
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={dynamicOptions}
      getOptionLabel={(option) => option.name || ""}
      noOptionsText={noOptionText}
      popupIcon={null}
      renderInput={(params) => (
        <TextField {...params} label="Search for Pokémon" />
      )}
      onChange={(event, newValue) => {
        if (newValue) onSelect(newValue.name);
      }}
    />
  );
}
