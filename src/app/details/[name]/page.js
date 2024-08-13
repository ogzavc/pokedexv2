"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../../lib/hooks";
import {
  selectPokemonByName,
  fetchPokemonDetails,
} from "../../../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import { themeColors, iconColors, typeIcons } from "../../../utils/constants";
import Image from "next/image";
import styles from "./details.module.css";
import LinearProgress from "@mui/material/LinearProgress";

export default function Details() {
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

  const {
    id,
    abilities,
    height,
    weight,
    stats,
    types,
    sprites,
    base_experience,
  } = pokemon.data;

  const theme = (types && types[0]?.type?.name) || "normal";

  const backgroundColor = themeColors[theme] || themeColors["normal"];

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "failed") {
    return <div className={styles.error}>Failed to load Pokémon details.</div>;
  }

  return (
    <main className={styles.detailsPage}>
      <div className={`${styles.division} ${styles.detailsContent}`}>
        <div
          className={styles.detailCard}
          style={{ "--backgroundColor": backgroundColor }}
        >
          <div className={styles.pokemonInfo}>
            <h1 className={styles.pokemonName}>{name}</h1>
            <div className={styles.pokemonId}>
              #{id.toString().padStart(3, "0")}
            </div>
            <div className={styles.types}>
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
          <div className={styles.pokemonImageContainer}>
            <Image
              src={sprites.other["official-artwork"].front_default}
              alt={name}
              width={300}
              height={300}
              className={styles.pokemonImage}
            />
          </div>
        </div>

        <section className={styles.detailSection}>
          <h2>Abilities</h2>

          <div className={styles.infoItem}>
            <ul>
              {abilities.map((ability, index) => (
                <li key={index}>
                  {ability.ability.name}
                  {ability.is_hidden && " (Hidden Ability)"}
                </li>
              ))}
            </ul>
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
    </main>
  );
}
