import React from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { convertId } from "../util/idConverter";
import { useFetch } from "../hooks/useFetch";
import { Button } from "react-bootstrap";

export default function PokemonController(props) {
  const previousPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${
    props.pokemon.id - 1
  }`;
  const followingPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${
    props.pokemon.id + 1
  }`;
  const [previousLoaded, previousPokemon] = useFetch(previousPokemonUrl, [
    props.pokemon.id,
  ]);
  const [followingLoaded, followingPokemon] = useFetch(followingPokemonUrl, [
    props.pokemon.id,
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
        <Button
          variant="outline-primary"
          className="button previous rounded-pill"
          onClick={() => selectPokemon(previousPokemon.data)}
        >
          {capitalizeText(previousPokemon.data.name)}
        </Button>
        <div className="pokemon-name">{capitalizeText(props.pokemon.name)}</div>
        <div className="pokemon-id">{convertId(props.pokemon.id)}</div>
        <Button
          variant="outline-primary"
          className="button next rounded-pill"
          onClick={() => selectPokemon(followingPokemon.data)}
        >
          {followingPokemon.data.name}
        </Button>
      </div>
    )
  );
}
