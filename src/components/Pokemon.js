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
      <div class="cards-list">
        <div class="card 1">
          <div class="card_image">
            {" "}
            <img src={pokemon.data.sprites.front_default} />{" "}
          </div>
          <div class="card_title title-white">
            <p>Card Title</p>
          </div>
        </div>
      </div>
    )
  );
}
