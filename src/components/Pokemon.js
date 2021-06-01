import React from "react";
import { convertPicture } from "../util/pictureConverter";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { card } from "../css/App.css";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };
  const { pokemonData } = props;
  console.log(pokemonData);
  return (
    <div className="card">
      <Link
        className="card_image"
        to={`/profile/${pokemonData.id}`}
        style={card}
        //onClick={() => selectPokemon(pokemon.data)}
      >
        <img src={convertPicture(pokemonData.id)} alt="" />
      </Link>
      <PokemonDetail
        title={pokemonData.name}
        details={pokemonData.types}
        id={pokemonData.id}
      />
    </div>
  );
}
