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
} from "@/components/Icons";

export const themeColors = {
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

export const iconColors = {
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

export const typeIcons = {
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

export const typeOptions = [
  { label: "Normal", id: "normal" },
  { label: "Fighting", id: "fighting" },
  { label: "Flying", id: "flying" },
  { label: "Poison", id: "poison" },
  { label: "Ground", id: "ground" },
  { label: "Rock", id: "rock" },
  { label: "Bug", id: "bug" },
  { label: "Ghost", id: "ghost" },
  { label: "Steel", id: "steel" },
  { label: "Fire", id: "fire" },
  { label: "Water", id: "water" },
  { label: "Grass", id: "grass" },
  { label: "Electric", id: "electric" },
  { label: "Psychic", id: "psychic" },
  { label: "Ice", id: "ice" },
  { label: "Dragon", id: "dragon" },
  { label: "Dark", id: "dark" },
  { label: "Fairy", id: "fairy" },
  { label: "Stellar", id: "stellar" },
  { label: "Unknown", id: "unknown" },
];
