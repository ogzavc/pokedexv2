"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import {
  selectPokemonByName,
  fetchPokemonDetails,
} from "../../../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import styles from "./details.module.css";
import PokeCard from "../../../components/PokeCard";
import PokeAbilities from "../../../components/PokeAbilities";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
        <ArrowBackIcon />
      </Button>
      <section className={styles.detailsPage}>
        <div className={`${styles.division} ${styles.detailsContent}`}>
          <PokeCard pokemonName={name} isSmall={false} />

          <section className={styles.detailSection}>
            <h2>Abilities</h2>

            <div className={styles.infoItem}>
              <PokeAbilities abilities={abilities} />
            </div>
          </section>
        </div>

        <div className={styles.division}>
          <div className={styles.detailsContent}>
            <section className={styles.detailSection}>
              <h2>About</h2>
              <div className={styles.aboutDetails}>
                <div className={styles.infoItem}>
                  <strong>Height:</strong> {height / 10} m
                </div>
                <div className={styles.infoItem}>
                  <strong>Weight:</strong> {weight / 10} kg
                </div>
                <div className={styles.infoItem}>
                  <strong>Base Experience:</strong> {base_experience} xp
                </div>
              </div>
            </section>

            <section className={styles.detailSection}>
              <h2>Stats</h2>
              <div className={styles.stats}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.statItem}>
                    <span className={styles.statName}>{stat.stat.name}</span>
                    <LinearProgress
                      variant="determinate"
                      value={(stat.base_stat / 255) * 100}
                      className={styles.statBar}
                    />

                    <span className={styles.statNumber}>{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
