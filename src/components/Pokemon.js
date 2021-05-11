import React from "react";
import { Card } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useFetch(url, []);

  return (
    isLoaded &&
    pokemon && (
      <div className="card-container">
        <Card className="card">
          <Card.Img src={pokemon.data.sprites.front_default} alt="pokemon" />
        </Card>
        <PokemonDetail title={name} details={pokemon.data.types} />
      </div>
    )
  );
}
