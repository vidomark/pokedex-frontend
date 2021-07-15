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
  const [loggedIn, setLoggedIn] = useState(null);

  const [currentPokemonNumber, setCurrentPokemonNumber] =
    useState(loadedPokemonNumber);
  const loadPokemons = () => {
    setCurrentPokemonNumber((previous) => previous + loadedPokemonNumber);
  };

  useEffect(() => {
    if (apiController.getState() === "get") {
      const url = `http://localhost:8080/pokemon?limit=${currentPokemonNumber}`;
      const header = { Authorization: `Bearer ${token.getToken()}` };
      fetchData(url, header).then((result) => {
        if (result) {
          setLoggedIn(true);
          setPokemons(result.data);
        } else {
          setLoggedIn(false);
        }
      });
    }
    /* eslint-disable */
  }, [currentPokemonNumber]);

  // Successful authentication
  if (pokemons) {
    return (
      <Container className="main-container">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            {...{ pokemon }}
            {...{ selectPokemon }}
          />
        ))}
        <Pagination {...{ currentPokemonNumber }} {...{ loadPokemons }} />
      </Container>
    );
    // Unsuccessful authentication
  } else if (loggedIn === false) {
    return (
      <Container className="main-container">
        <Alert className="mt-5" variant="danger">
          Unathorized request! Please sign in!
        </Alert>
      </Container>
    );
    // Fetching pokemons
  } else {
    return (
      <Container className="main-container">
        <Alert className="mt-5" variant="info">
          Loading pokemons
        </Alert>
      </Container>
    );
  }
}

/*
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
      )} */
