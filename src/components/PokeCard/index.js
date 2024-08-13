"use client";
import { useAppSelector } from "../../lib/hooks";
import { selectPokemonByName } from "../../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { themeColors, iconColors, typeIcons } from "../../utils/constants";
import Image from "next/image";
import styles from "./pokeCard.module.css";

function PokeCard({ pokemonName, isSmall = true, onClick }) {
  const pokemon = useAppSelector((state) =>
    selectPokemonByName(state, pokemonName)
  );

  const { data, name } = pokemon;
  const { id, types, sprites } = data;

  const theme = (types && types[0]?.type?.name) || "normal";

  const backgroundColor = themeColors[theme] || themeColors["normal"]; // Default to normal if theme is not found

  return (
    <div
      className={`${styles.pokeCard} ${isSmall ? styles.cardHover : ""}`}
      style={{ "--backgroundColor": backgroundColor }}
      onClick={onClick}
    >
      <div className={styles.cardInfo}>
        <div className={styles.pokeId}>#{id.toString().padStart(3, "0")}</div>
        <div className={styles.pokeName}>{name}</div>
        <div className={styles.typeContainer}>
          {types.map((item, index) => {
            const IconComponent = typeIcons[item.type.name];
            return (
              <div
                key={index}
                className={styles.typeBadge}
                style={{ color: iconColors[item.type.name] }}
              >
                <IconComponent fontSize="small" />
                <span className={styles.icon}>
                  <b>{item.type.name}</b>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pokeImageContainer}>
        <Image
          priority
          src={sprites.other["official-artwork"].front_default}
          alt={name}
          layout="responsive"
          width={100}
          height={100}
          className={styles.pokeImage}
        />
      </div>
    </div>
  );
}

export default PokeCard;
