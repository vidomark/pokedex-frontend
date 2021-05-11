import React from "react";
import { useFetch } from "../hooks/useFetch";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useFetch(url, []);

  return (
    isLoaded &&
    pokemon && (
      <div className="card">
        <div className="card_image">
          <img src={pokemon.data.sprites.front_default} />{" "}
        </div>
        <PokemonDetail title={pokemon.data.name} details={pokemon.data.types} />
      </div>
    )
  );
}
