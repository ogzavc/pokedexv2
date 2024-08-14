"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectPokemonByName,
  fetchPokemonDetails,
} from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { addOrRemoveFavorite } from "@/utils/helpers";
import { PokeCard, PokeAbilities, PokeAbout, PokeStats } from "@/components";
import {
  FavoriteBorderIcon,
  NavigateBeforeIcon,
  FavoriteIcon,
} from "@/components/Icons";
import styles from "./details.module.css";

export default function Details() {
  const router = useRouter();
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState(false);

  const pokemon = useAppSelector((state) => selectPokemonByName(state, name));
  const status = useAppSelector((state) => state.pokemonDetails.status);

  useEffect(() => {
    if (!pokemon) {
      dispatch(fetchPokemonDetails(name));
    }
  }, [pokemon, name, dispatch]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(name));
  }, []);

  if (!pokemon) {
    return null;
  }

  const { abilities, height, weight, stats, base_experience } = pokemon.data;

  const handleBackClick = () => {
    router.back();
  };

  const handleFavoriteClick = () => {
    addOrRemoveFavorite(name);
    setIsFavorite(!isFavorite);
  };

  return (
    <main className={styles.detailsPageWrapper}>
      <div className={styles.detailsPageHeader}>
        <Button color="inherit" variant="outlined" onClick={handleBackClick}>
          <NavigateBeforeIcon />
        </Button>

        <Button variant="outlined" onClick={handleFavoriteClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Button>
      </div>

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
