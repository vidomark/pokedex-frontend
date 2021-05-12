import React from "react";
import { Button } from "react-bootstrap";

export default function PokemonController(props) {
  const pokemonName = props.name;
  return (
    <div className="button-container">
      <Button
        variant="outline-primary"
        className="button previous rounded-pill"
      >
        Primary
      </Button>
      <div className="pokemon-name">{pokemonName}</div>
      <Button variant="outline-primary" className="button next rounded-pill">
        Primary
      </Button>
    </div>
  );
}
