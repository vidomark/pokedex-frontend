import React, { useState, useEffect, useMemo } from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

export default function MainComponent(props) {
  const { selectPokemon, nextPage, previousPage, type } = props;
  const pokemonData = props.pokemonData;
  return (
    pokemonData && (
      <div>
        <div>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </div>
        <Container className="main-container">
          {pokemonData.data.map((pokemon) => (
            <Pokemon
              key={pokemon.name}
              pokemonData={pokemon}
              selectPokemon={selectPokemon}
            />
          ))}
        </Container>
      </div>
    )
  );
}
