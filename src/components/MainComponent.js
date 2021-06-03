import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import { Container } from "react-bootstrap";

export default function MainComponent(props) {
  const { selectPokemon, pokemonList } = props;
  const [visible, setVisible] = useState(18);

  const loadPokemons = () => {
    setVisible((previous) => previous + 18);
  };

  return (
    pokemonList && (
      <div>
        <Container className="main-container">
          {pokemonList.slice(0, visible).map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemonData={pokemon}
              selectPokemon={selectPokemon}
            />
          ))}
          {visible < pokemonList.length ? (
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
