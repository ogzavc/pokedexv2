"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import {
  selectPokemonByName,
  fetchPokemonDetails,
} from "../../../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import styles from "./details.module.css";
import PokeCard from "../../../components/PokeCard";
import PokeAbilities from "../../../components/PokeAbilities";
import PokeAbout from "../../../components/PokeAbout";
import PokeStats from "../../../components/PokeStats";
import {
  FavoriteBorderIcon,
  NavigateBeforeIcon,
  FavoriteIcon,
} from "../../../components/Icons";

export default function Details() {
  const router = useRouter();
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const pokemon = useAppSelector((state) => selectPokemonByName(state, name));
  const status = useAppSelector((state) => state.pokemonDetails.status);

  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokemonDetails(name));
    }
  }, [pokemon, name, dispatch]);

  if (!pokemon) {
    return null;
  }

  const { abilities, height, weight, stats, base_experience } = pokemon.data;

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "failed") {
    return <div className={styles.error}>Failed to load Pokémon details.</div>;
  }

  const handleBackClick = (pokemonName) => {
    router.push(`/`);
  };

  return (
    <main className={styles.detailsPageWrapper}>
      <Button
        color="inherit"
        variant="outlined"
        className={styles.backButton}
        onClick={handleBackClick}
      >
        <NavigateBeforeIcon />
      </Button>

      <Button
        variant="outlined"
        className={styles.backButton}
        onClick={handleBackClick}
      >
        <FavoriteBorderIcon />
      </Button>

      <section className={styles.detailsPage}>
        <div className={`${styles.division} ${styles.detailsContent}`}>
          <PokeCard pokemonName={name} isSmall={false} />

          <section className={styles.detailSection}>
            <h2>Abilities</h2>

            <PokeAbilities abilities={abilities} />
          </section>
        </div>

        <div className={styles.division}>
          <div className={styles.detailsContent}>
            <section className={styles.detailSection}>
              <h2>About</h2>

              <PokeAbout
                height={height}
                weight={weight}
                experience={base_experience}
              />
            </section>

            <section className={styles.detailSection}>
              <h2>Stats</h2>

              <PokeStats stats={stats} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
