import React from "react";
import { convertPicture } from "../../util/pictureConverter";
import { Link } from "react-router-dom";
import PokemonDetail from "./PokemonDetail";

export default function Pokemon(props) {
  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };
  const { pokemonData } = props;

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
        />
      </div>
    </article>
  );
}

{
  /* <div className="card">
  <Link
    className="card_image"
    to={`/pokemon/${pokemonData.id}`}
    style={card}
    onClick={() => selectPokemon(pokemonData)}
  >
    <img src={convertPicture(pokemonData.id)} alt="" />
  </Link>
  <PokemonDetail
    title={pokemonData.name}
    details={pokemonData.types}
    id={pokemonData.id}
  />
</div>; */
}
