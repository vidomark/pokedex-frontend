import React, { useEffect, useState } from "react";
import { capitalizeText } from "../../util/textCapitalizer";
import { convertId } from "../../util/idConverter";
import { useFetch } from "../../hooks/useFetch";
import { fetchData } from "../../util/apiGet";

export default function PokemonController(props) {
  const pokemon = props.pokemon;
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [followingPokemon, setFollowingPokemon] = useState(null);

  const previousId = pokemon.id < 2 ? 1 : pokemon.id - 1;
  const followingId = pokemon.id + 1;

  const previousPokemonUrl = `http://localhost:8080/pokemon/${previousId}`;
  const followingPokemonUrl = `http://localhost:8080/pokemon/${followingId}`;

  /*   let previousPokemon = useFetch(previousPokemonUrl, [pokemon.id]);
  let followingPokemon = useFetch(followingPokemonUrl, [pokemon.id]); */

  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };

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
            onClick={() => selectPokemon(previousPokemon)}
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
          onClick={() => selectPokemon(followingPokemon)}
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
