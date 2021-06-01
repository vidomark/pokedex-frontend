import React, { useState } from "react";
import Pokemon from "./Pokemon";
import { Container } from "react-bootstrap";

export default function MainComponent(props) {
  const { selectPokemon, type } = props;
  const pokemonData = props.pokemonData;
  const [visible, setVisible] = useState(18);
  const loadPokemons = () => {
    setVisible((previous) => previous + 18);
  };
  return (
    pokemonData && (
      <div>
        <Container className="main-container">
          {pokemonData.data.slice(0, visible).map((pokemon) => (
            <Pokemon
              key={pokemon.name}
              pokemonData={pokemon}
              selectPokemon={selectPokemon}
            />
          ))}
          {visible < pokemonData.data.length ? (
            <div className="pagination-button-container">
              <button onClick={() => loadPokemons()} className="button">
                Load more...
              </button>
            </div>
          ) : null}
        </Container>
      </div>
    )
  );
}
