export const idFormatter = (id) => {
  if (id) {
    return `#${id.toString().padStart(3, "0")}`;
  } else return "####";
};

export const myFavoritePokemons = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const addOrRemoveFavorite = (pokemonName) => {
  const favorites = myFavoritePokemons();

  if (!favorites.includes(pokemonName)) {
    favorites.push(pokemonName);
  } else {
    const index = favorites.indexOf(pokemonName);
    if (index > -1) {
      favorites.splice(index, 1);
    }
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};
