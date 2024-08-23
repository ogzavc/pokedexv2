"use client";
import { memo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectPokemonByName } from "@/lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { useIsMobile } from "@/hooks";
import { themeColors } from "@/utils/constants";
import { idFormatter } from "@/utils/helpers";
import { PokeBadge, Image, Skeleton } from "@/components";
import styles from "./styles.module.css";

function PokeCard({ pokemonName, isSmall = true, onClick, isLoading }) {
  const isMobile = useIsMobile();

  const pokemon = useAppSelector((state) =>
    selectPokemonByName(state, pokemonName)
  );

  const { data = {}, name } = pokemon || {};
  const { id, types, sprites } = data;

  const theme = (types && types[0]?.type?.name) || "normal";
  const backgroundColor = themeColors[theme] || themeColors["normal"];

  // Fallback image
  const fallbackImage = "/unkown.png";
  const pokemonImage =
    sprites?.other?.["official-artwork"]?.front_default || fallbackImage;

  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        animation="wave"
        width={"100%"}
        height={isMobile ? 120 : 150}
      />
    );
  }

  return (
    <div
      className={`${styles.pokeCard} ${isSmall ? styles.cardHover : ""}`}
      style={{ "--backgroundColor": backgroundColor }}
      onClick={onClick}
    >
      <div className={styles.cardInfo}>
        <div className={styles.pokeId}>{idFormatter(id)}</div>
        <div className={styles.pokeName}>{name}</div>
        <PokeBadge types={types} />
      </div>
      <div
        className={`${styles.pokeImageContainer} ${
          isSmall ? "" : styles.pokeImageFullWidth
        }`}
      >
        <Image
          src={pokemonImage}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          className={styles.pokeImage}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default memo(PokeCard);
