import React, { useEffect, useState } from "react";
import token from "../../util/token";
import { Link } from "react-router-dom";
import { capitalizeText } from "../../util/textCapitalizer";
import { convertId } from "../../util/idConverter";
import { fetchData } from "../../util/api";

export default function PokemonController({ pokemon, selectPokemon }) {
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [followingPokemon, setFollowingPokemon] = useState(null);

  const previousId = pokemon.id < 2 ? 1 : pokemon.id - 1;
  const followingId = pokemon.id + 1;

  const previousPokemonUrl = `http://localhost:8080/pokemon/${previousId}`;
  const followingPokemonUrl = `http://localhost:8080/pokemon/${followingId}`;

  useEffect(() => {
    const header = { Authorization: `Bearer ${token.getToken()}` };
    fetchData(previousPokemonUrl, header)
      .then((result) => setPreviousPokemon(result.data))
      .catch((error) => console.log(error));

    fetchData(followingPokemonUrl, header)
      .then((result) => setFollowingPokemon(result.data))
      .catch((error) => console.log(error));
  }, [followingPokemonUrl, previousPokemonUrl]);

  return (
    previousPokemon &&
    followingPokemon && (
      <div className="button-container">
        {pokemon.id > 1 && (
          /* Previous pokemon */
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

        {/* Current pokemon */}
        <div className="pokemon-name">{capitalizeText(pokemon.name)}</div>
        <div className="pokemon-id">{convertId(pokemon.id)}</div>

        {/* Following pokemon */}
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
