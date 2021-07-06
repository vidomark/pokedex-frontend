import React from "react";
import { convertPicture } from "../../util/pictureConverter";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const { pokemonData, postData } = props;
  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };

  return (
    <article
      class="card card"
      style={{ width: "200px", height: "350px", margin: "29px" }}
      onClick={() => selectPokemon(pokemonData)}
    >
      <div class="card__img"></div>
      <Link to={`/pokemon/${pokemonData.id}`} class="card_link">
        <div
          class="card__img--hover"
          style={{
            backgroundImage: `url(${convertPicture(pokemonData.id)})`,
            width: "200px",
            backgroundColor: "#3f3f3f",
          }}
        ></div>
      </Link>
      <div class="card__info">
        <PokemonDetail
          title={pokemonData.name}
          details={pokemonData.types}
          id={pokemonData.id}
          {...{ postData }}
        />
      </div>
    </article>
  );
}
