"use client";
import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@/components";
import styles from "./styles.module.css";
import useDebounce from "@/hooks/useDebounce";
import axiosInstance from "@/api/axiosInstance"; // Import your axios instance

export default function SearchInput({ onSelect }) {
  const [inputValue, setInputValue] = useState("");
  const [noOptionText, setNoOptionText] = useState("Start typing to search");
  const debouncedInputValue = useDebounce(inputValue, 600);
  const [dynamicOptions, setDynamicOptions] = useState([]);

  useEffect(() => {
    if (debouncedInputValue) {
      setNoOptionText("Searching...");
      axiosInstance
        .get(`/pokemon/${debouncedInputValue}/`)
        .then((response) => {
          const data = response.data;
          if (data) {
            setDynamicOptions([data]);
          } else {
            setDynamicOptions([]);
            setNoOptionText("No Pokémon found");
          }
        })
        .catch(() => {
          setDynamicOptions([]);
          setNoOptionText("No Pokémon found");
        });
    } else {
      setDynamicOptions([]);
      setNoOptionText("Start typing to search");
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    if (inputValue) {
      setNoOptionText("Searching...");
    }
  }, [inputValue]);

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
