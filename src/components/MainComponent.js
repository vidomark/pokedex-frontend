import React from "react";
import Pokemon from "./Pokemon";
import { Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";

export default function MainComponent() {
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  const [isLoaded, fetchedData] = useFetch(pokemonUrl, []); // fetch data with custom hook

  return (
    isLoaded &&
    fetchedData && (
      <Container className="main-container">
        {fetchedData.data.results.map((pokemonData) => (
          <Pokemon key={pokemonData.name} pokemonData={pokemonData} />
        ))}
      </Container>
    )
  );
}
