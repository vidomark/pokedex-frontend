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
          {console.log(pokemonData.data)}
          {pokemonData.data.map((pokemon) => console.log(pokemon))}
          {pokemonData.data.map((pokemon) => (
            <Pokemon
              key={pokemon.name}
              pokemonData={pokemon}
              selectPokemon={selectPokemon}
            />
          ))}
          {/* {pokemonData.data.results.map((pokemonData) => (
            <Pokemon
              key={pokemonData.name}
              pokemonData={pokemonData}
              selectPokemon={selectPokemon}
            />
          ))} */}
        </Container>
      </div>
    )
  );
}
