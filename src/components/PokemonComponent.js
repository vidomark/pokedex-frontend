import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import { Container, Alert } from "react-bootstrap";
import { loadedPokemonNumber } from "../util/pokemonConfig";
import { useUrl, useSetUrl } from "../contexts/UrlProvider";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { fetchData } from "../util/apiGet";
import { useEffect } from "react";

export default function PokemonComponent({ selectPokemon }) {
  const pokemons = usePokemons();
  const setPokemons = useSetPokemons();
  const url = useUrl();
  const setUrl = useSetUrl();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

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
    fetchData(url)
      .then((result) => setPokemons(result))
      .catch((error) => {
        console.log(error);
        setError("error");
        setMessage("Unauthorized request. Please sign in.");
      });
    /* eslint-disable */
  }, [url]);

  return (
    <Container className="main-container">
      {pokemons ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            {...{ selectPokemon }}
          />
        ))
      ) : (
        <Alert style={{ marginTop: "60px" }} variant={error}>
          {message}
        </Alert>
      )}
      {!error && (
        <Pagination {...{ currentPokemonNumber }} {...{ loadPokemons }} />
      )}
    </Container>
  );
}
