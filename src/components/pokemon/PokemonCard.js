import React from "react";
import { convertPicture } from "../../util/pictureConverter";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon({ pokemon, selectPokemon }) {
  return (
    <article
      class="card card"
      style={{ width: "200px", height: "350px", margin: "29px" }}
      onClick={() => selectPokemon(pokemon)}
    >
      <div class="card__img"></div>
      <Link to={`/pokemon/${pokemon.id}`} class="card_link">
        <div
          class="card__img--hover"
          style={{
            backgroundImage: `url(${convertPicture(pokemon.id)})`,
            width: "200px",
            backgroundColor: "#3f3f3f",
          }}
        ></div>
      </Link>
      <div class="card__info">
        <PokemonDetail
          title={pokemon.name}
          details={pokemon.types}
          id={pokemon.id}
        />
      </div>
    </article>
  );
}
