"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectPokemonByName,
  fetchPokemonDetails,
} from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import {
  PokeCard,
  PokeAbilities,
  PokeAbout,
  PokeStats,
  Button,
  Skeleton,
  BackButton,
} from "@/components";
import { FavoriteBorderIcon, FavoriteIcon } from "@/components/Icons";
import { addOrRemoveFavorite } from "@/utils/helpers";
import styles from "./styles.module.css";

export default function Details() {
  const router = useRouter();
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const pokemon = useAppSelector((state) => selectPokemonByName(state, name));
  const status = useAppSelector((state) => state.pokemonDetails.status);

  useEffect(() => {
    if (name && !pokemon) {
      dispatch(fetchPokemonDetails(name));
    }
  }, [name, pokemon, dispatch]);

  useEffect(() => {
    if (pokemon?.data && status === "succeeded") {
      setIsLoading(false);
    }
  }, [pokemon?.data, status]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(name));
  }, [name]);

  const handleFavoriteClick = useCallback(() => {
    addOrRemoveFavorite(name);
    setIsFavorite(!isFavorite);
  }, [name, isFavorite]);

  if (isLoading) {
    return (
      <main className={`${styles.detailsPage} ${styles.detailsPageWrapper}`}>
        <div className={styles.skeletonWrapper}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={300}
          />
          <Skeleton variant="rectangular" width="100%" height={200} />
        </div>

        <div className={styles.skeletonWrapper}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={200}
          />
          <Skeleton
            variant="rounded"
            animation="wave"
            width="100%"
            height={300}
          />
        </div>
      </main>
    );
  }

  const { abilities, height, weight, stats, base_experience } =
    pokemon?.data || {};

  return (
    <main className={styles.detailsPageWrapper}>
      <div className={styles.detailsPageHeader}>
        <BackButton />

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
