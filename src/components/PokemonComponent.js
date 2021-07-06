import React, { useState, useCallback } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import { Container } from "react-bootstrap";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { useEffect } from "react";
import axios from "axios";

export default function PokemonComponent(props) {
  const { selectPokemon, postData } = props;
  const [currentPokemonNumber, setCurrentPokemonNumber] =
    useState(loadedPokemonNumber);

  const pokemons = usePokemons();
  const setPokemons = useSetPokemons();
  const loadPokemons = () => {
    setCurrentPokemonNumber((previous) => previous + loadedPokemonNumber);
  };
  const fetchPokemons = (limit) => {
    const url = `http://localhost:8080/pokemon?limit=${limit}`;
    axios
      .get(url)
      .then((result) => setPokemons(result.data))
      .catch(console.error());
  };

  useEffect(() => {
    console.log("render");
    fetchPokemons(currentPokemonNumber);
  }, [currentPokemonNumber]);

  return (
    pokemons && (
      <Container className="main-container">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonData={pokemon}
            {...{ selectPokemon }}
            {...{ postData }}
          />
        ))}
        <Pagination {...{ currentPokemonNumber, loadPokemons }} />
      </Container>
    )
  );
}
