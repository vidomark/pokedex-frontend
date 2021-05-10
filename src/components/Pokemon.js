import React, { useState } from "react";
import { useHttp } from "../hooks/useHttp";

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useHttp(url, []);
  return (
    isLoaded &&
    pokemon && (
      <div>
        <img src={pokemon.data.sprites.front_default} alt="pokemon image" />
      </div>
    )
  );
}
