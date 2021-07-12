import React, { useEffect, useState } from "react";
import { capitalizeText } from "../../util/textCapitalizer";
import { convertId } from "../../util/idConverter";
import { fetchData } from "../../util/api";

export default function PokemonController({ pokemon, setPokemon }) {
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [followingPokemon, setFollowingPokemon] = useState(null);

  const previousId = pokemon.id < 2 ? 1 : pokemon.id - 1;
  const followingId = pokemon.id + 1;

  const previousPokemonUrl = `http://localhost:8080/pokemon/${previousId}`;
  const followingPokemonUrl = `http://localhost:8080/pokemon/${followingId}`;

  useEffect(() => {
    fetchData(previousPokemonUrl)
      .then((result) => setPreviousPokemon(result))
      .catch((error) => console.log(error));

    fetchData(followingPokemonUrl)
      .then((result) => setFollowingPokemon(result))
      .catch((error) => console.log(error));
  }, [followingPokemonUrl, previousPokemonUrl]);

  return (
    previousPokemon &&
    followingPokemon && (
      <div className="button-container">
        {pokemon.id > 1 && (
          <button
            className="button previous"
            onClick={() => setPokemon(previousPokemon)}
          >
            <span>{capitalizeText(previousPokemon.name)}</span>
            <span className="pokemon-change-id">
              {convertId(previousPokemon.id)}
            </span>
          </button>
        )}
        <div className="pokemon-name">{capitalizeText(pokemon.name)}</div>
        <div className="pokemon-id">{convertId(pokemon.id)}</div>
        <button
          className="button following"
          onClick={() => setPokemon(followingPokemon)}
        >
          <span>{capitalizeText(followingPokemon.name)}</span>
          <span className="pokemon-change-id">
            {convertId(followingPokemon.id)}
          </span>
        </button>
      </div>
    )
  );
}
