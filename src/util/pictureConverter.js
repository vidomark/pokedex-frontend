export const convertPicture = (pokemonId) => {
  if (pokemonId < 10)
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${pokemonId}.png`;
  if (10 <= pokemonId && pokemonId < 100)
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${pokemonId}.png`;
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonId}.png`;
};
