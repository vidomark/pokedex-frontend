import React, { useState, useEffect, useMemo } from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";

export default function MainComponent(props) {
  const [pokemonList, setPokemonList] = useState(null);
  const [pokemonUrl, setPokemonUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=18"
  );

  const fetchPokemons = (url) => {
    axios.get(url).then((result) => setPokemonList(result));
  };

  const selectPokemon = (pokemon) => {
    props.selectPokemon(pokemon);
  };

  const nextPage = () => {
    fetchPokemons(pokemonList.data.next);
  };

  const previousPage = () => {
    fetchPokemons(pokemonList.data.previous);
  };

  useEffect(() => {
    fetchPokemons(pokemonUrl);
  }, [pokemonUrl]);

  return (
    pokemonList && (
      <div>
        <div>
          <Pagination nextPage={nextPage} previousPage={previousPage} />
        </div>
        <Container className="main-container">
          {pokemonList.data.results.map((pokemonData) => (
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
