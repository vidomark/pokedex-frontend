import React from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { convertId } from "../util/idConverter";
import { useFetch } from "../hooks/useFetch";

export default function PokemonController(props) {
  const pokemon = props.pokemon;
  const previousPokemonUrl = `http://localhost:8080/${pokemon.id - 1}`;
  const followingPokemonUrl = `http://localhost:8080/${pokemon.id + 1}`;

  const [previousLoaded, previousPokemon] = useFetch(previousPokemonUrl, [
    pokemon.id,
  ]);

  const [followingLoaded, followingPokemon] = useFetch(followingPokemonUrl, [
    pokemon.id,
  ]);

  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };

  return (
    previousLoaded &&
    followingLoaded &&
    previousPokemon &&
    followingPokemon && (
      <div className="button-container">
        {pokemon.id > 1 && (
          <button
            className="button previous"
            onClick={() => selectPokemon(previousPokemon.data)}
          >
            <span>{capitalizeText(previousPokemon.data.name)}</span>
            <span className="pokemon-change-id">
              {convertId(previousPokemon.data.id)}
            </span>
          </button>
        )}
        <div className="pokemon-name">{capitalizeText(pokemon.name)}</div>
        <div className="pokemon-id">{convertId(pokemon.id)}</div>
        <button
          className="button following"
          onClick={() => selectPokemon(followingPokemon.data)}
        >
          <span>{capitalizeText(followingPokemon.data.name)}</span>
          <span className="pokemon-change-id">
            {convertId(followingPokemon.data.id)}
          </span>
        </button>
      </div>
    )
  );
}
