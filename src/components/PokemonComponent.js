import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import token from "../util/token";
import apiController from "../util/apiController";
import { Container, Alert } from "react-bootstrap";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { fetchData } from "../util/api";
import { useEffect } from "react";

export default function PokemonComponent({ selectPokemon }) {
  const pokemons = usePokemons();
  const setPokemons = useSetPokemons();

  const [currentPokemonNumber, setCurrentPokemonNumber] =
    useState(loadedPokemonNumber);
  const loadPokemons = () => {
    setCurrentPokemonNumber((previous) => previous + loadedPokemonNumber);
  };

  useEffect(() => {
    if (apiController.getState() === "get") {
      const url = `http://localhost:8080/pokemon?limit=${currentPokemonNumber}`;
      fetchData(url).then((result) => {
        try {
          setPokemons(result.data);
        } catch (exception) {}
      });
    }
    /* eslint-disable */
  }, [currentPokemonNumber]);

  return (
    <Container className="main-container">
      {pokemons ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            {...{ pokemon }}
            {...{ selectPokemon }}
          />
        ))
      ) : (
        <Alert style={{ marginTop: "60px" }} variant="danger">
          Unauthorized request. Please sign in.
        </Alert>
      )}
      {token.available() && (
        <Pagination {...{ currentPokemonNumber }} {...{ loadPokemons }} />
      )}
    </Container>
  );
}
