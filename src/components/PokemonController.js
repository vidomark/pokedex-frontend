import React from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { convertId } from "../util/idConverter";
import { Button } from "react-bootstrap";

export default function PokemonController(props) {
  const pokemonName = props.pokemon.name;
  const pokemonId = props.pokemon.id;
  return (
    <div className="button-container">
      <Button
        variant="outline-primary"
        className="button previous rounded-pill"
      >
        Primary
      </Button>
      <div className="pokemon-name">{capitalizeText(pokemonName)}</div>
      <div className="pokemon-id">{convertId(pokemonId)}</div>
      <Button variant="outline-primary" className="button next rounded-pill">
        Primary
      </Button>
    </div>
  );
}
