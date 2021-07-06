import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { useUrl, useSetUrl } from "../contexts/UrlProvider";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { useEffect } from "react";
import axios from "axios";

export default function PokemonComponent({ selectPokemon }) {
  const pokemons = usePokemons();
  const setPokemons = useSetPokemons();
  const url = useUrl();
  const setUrl = useSetUrl();

  const [currentPokemonNumber, setCurrentPokemonNumber] =
    useState(loadedPokemonNumber);
  const loadPokemons = () => {
    setCurrentPokemonNumber((previous) => previous + loadedPokemonNumber);
    setUrl(
      `http://localhost:8080/pokemon?limit=${
        currentPokemonNumber + loadedPokemonNumber
      }`
    );
  };
  const fetchPokemons = () => {
    axios
      .get(url)
      .then((result) => setPokemons(result.data))
      .catch(console.error());
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPokemonNumber]);

  return (
    pokemons && (
      <Container className="main-container">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonData={pokemon}
            {...{ selectPokemon }}
          />
        ))}
        <Pagination {...{ currentPokemonNumber, loadPokemons }} />
      </Container>
    )
  );
}
