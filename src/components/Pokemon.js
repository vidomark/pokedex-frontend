import React from "react";
import { Card } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useFetch(url, []);
  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    isLoaded && (
      <div className="card-container">
        <Card className="card">
          <Card.Img src={pokemon.data.sprites.front_default} alt="pokemon" />
        </Card>
        <p>{capitalizeName(name)}</p>
        <div className="pokemon-type">
          {pokemon.data.types.map((type) => (
            <p className="type" key={type.type.name}>
              {type.type.name}
            </p>
          ))}
        </div>
      </div>
    )
  );
}
