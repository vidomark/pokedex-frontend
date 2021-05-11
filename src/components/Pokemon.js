import React from "react";
import { Card } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { card } from "../css/App.css";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useFetch(url, []);
  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };

  return (
    isLoaded &&
    pokemon && (
      <div className="card">
        <Link
          className="card_image"
          to={`/profile/${pokemon.data.id}`}
          style={card}
          onClick={() => selectPokemon(pokemon.data)}
        >
          <img src={pokemon.data.sprites.front_default} />
        </Link>
        <PokemonDetail title={pokemon.data.name} details={pokemon.data.types} />
      </div>
    )
  );
}
