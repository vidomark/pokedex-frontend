import React, { useState, useEffect, useMemo } from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

export default function MainComponent(props) {
  const { pokemonData, selectPokemon, nextPage, previousPage, type } = props;
  return (
    pokemonData && (
      <div>
        <div>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </div>
        <Container className="main-container">
          {pokemonData.data.results.map((pokemonData) => (
            <Pokemon
              key={pokemonData.name}
              pokemonData={pokemonData}
              selectPokemon={selectPokemon}
            />
          ))}
        </Container>
      </div>
    )
  );
}

{
  /* <Pokemon
                key={pokemonData.pokemon.name}
                pokemonData={pokemonData.pokemon}
                selectPokemon={selectPokemon}
              /> */
}
