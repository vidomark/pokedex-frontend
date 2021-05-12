export const convertId = (pokemonId) => {
  if (pokemonId < 10) return `#00${pokemonId}`;
  if (pokemonId < 100) return `#0${pokemonId}`;
  return `#${pokemonId}`;
};
