"use client";
import { useAppSelector } from "../../lib/hooks";
import { selectPokemonByName } from "../../lib/features/pokemonDetailsSlice/pokemonDetailsSlice";
import {
  AdjustIcon,
  FitnessCenterIcon,
  AirIcon,
  ScienceIcon,
  TerrainIcon,
  LandscapeIcon,
  PestControlIcon,
  VisibilityOffIcon,
  BuildIcon,
  LocalFireDepartmentIcon,
  WaterIcon,
  GrassIcon,
  FlashOnIcon,
  PsychologyIcon,
  AcUnitIcon,
  PetsIcon,
  DarkModeIcon,
  StarIcon,
  Brightness7Icon,
  HelpIcon,
} from "../Icons";
import Image from "next/image";
import styles from "./pokeCard.module.css";

function PokeCard({ pokemonName }) {
  const pokemon = useAppSelector((state) =>
    selectPokemonByName(state, pokemonName)
  );

  const { data, name } = pokemon;
  const { id, types } = data;

  const theme = (types && types[0]?.type?.name) || "normal";

  const themeColors = {
    fire: "#ff8d8d",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#c976a2",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ghost: "#857985",
    ice: "#88c9ff",
  };

  const iconColors = {
    fire: "#dd5454",
    grass: "#76ec7e",
    electric: "#ffd606",
    water: "#0074ac",
    ground: "#ba5d00",
    rock: "#80807f",
    fairy: "#d873e8",
    poison: "#d02881",
    bug: "#cb8c33",
    dragon: "#2e6de0",
    psychic: "#b8bf00",
    flying: "#7a7575",
    fighting: "#7d683c",
    normal: "#5d5252",
    ghost: "#a7a69f",
    ice: "#81d6fd",
  };

  const typeIcons = {
    normal: AdjustIcon,
    fighting: FitnessCenterIcon,
    flying: AirIcon,
    poison: ScienceIcon,
    ground: TerrainIcon,
    rock: LandscapeIcon,
    bug: PestControlIcon,
    ghost: VisibilityOffIcon,
    steel: BuildIcon,
    fire: LocalFireDepartmentIcon,
    water: WaterIcon,
    grass: GrassIcon,
    electric: FlashOnIcon,
    psychic: PsychologyIcon,
    ice: AcUnitIcon,
    dragon: PetsIcon,
    dark: DarkModeIcon,
    fairy: StarIcon,
    stellar: Brightness7Icon,
    unknown: HelpIcon,
  };

  const backgroundColor = themeColors[theme] || themeColors["normal"]; // Default to normal if theme is not found

  return (
    <div
      className={styles.pokeCard}
      style={{ "--backgroundColor": backgroundColor }}
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
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png `}
          alt={name}
          width={120}
          height={120}
          className={styles.pokeImage}
        />
      </div>
    </div>
  );
}

export default PokeCard;
