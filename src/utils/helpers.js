export const idFormatter = (id) => {
  if (id) {
    return `#${id.toString().padStart(3, "0")}`;
  } else return "####";
};

export const myFavoritePokemons = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  }
  return []; // Return an empty array when not in the browser
};

export const addOrRemoveFavorite = (pokemonName) => {
  if (typeof window !== "undefined") {
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
  }
};
