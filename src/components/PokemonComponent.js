import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import auth from "../util/token";
import { Container, Alert } from "react-bootstrap";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { useUrl, useSetUrl } from "../contexts/UrlProvider";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { fetchData } from "../util/api";
import { useEffect } from "react";

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

  useEffect(() => {
    if (auth.isAuthenticated())
      fetchData(url).then((result) => setPokemons(result.data));
    /* eslint-disable */
  }, [url]);

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
      {!auth.isAuthenticated && (
        <Pagination {...{ currentPokemonNumber }} {...{ loadPokemons }} />
      )}
    </Container>
  );
}
