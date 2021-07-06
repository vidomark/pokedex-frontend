import React, { useState } from "react";
import PokemonCard from "./pokemon/PokemonCard";
import Pagination from "./Pagination";
import { Container, Alert } from "react-bootstrap";
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
  const fetchPokemons = () => {
    axios
      .get(url)
      .then((result) => setPokemons(result.data))
      .catch(() => {
        setError("danger");
        setMessage("Unauthorized request, please sign in!");
      });
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPokemonNumber]);

  return (
    <Container className="main-container">
      {pokemons ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonData={pokemon}
            {...{ selectPokemon }}
          />
        ))
      ) : (
        <Alert style={{ marginTop: "60px" }} variant={error}>
          {message}
        </Alert>
      )}
    </Container>
  );
}
