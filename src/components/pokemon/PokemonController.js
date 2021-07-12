import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeText } from "../../util/textCapitalizer";
import { convertId } from "../../util/idConverter";
import { fetchData } from "../../util/api";

export default function PokemonController({
  pokemon,
  setPokemon,
  selectPokemon,
}) {
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
          <Link to={`/pokemon/${previousPokemon.id}`}>
            <button
              className="button previous"
              onClick={() => selectPokemon(previousPokemon)}
            >
              <span>{capitalizeText(previousPokemon.name)}</span>
              <span className="pokemon-change-id">
                {convertId(previousPokemon.id)}
              </span>
            </button>
          </Link>
        )}
        <div className="pokemon-name">{capitalizeText(pokemon.name)}</div>
        <div className="pokemon-id">{convertId(pokemon.id)}</div>
        <Link to={`/pokemon/${followingPokemon.id}`}>
          <button
            className="button following"
            onClick={() => selectPokemon(followingPokemon)}
          >
            <span>{capitalizeText(followingPokemon.name)}</span>
            <span className="pokemon-change-id">
              {convertId(followingPokemon.id)}
            </span>
          </button>
        </Link>
      </div>
    )
  );
}
