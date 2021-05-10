import React from "react";
import Pokemon from "./Pokemon";
import { Container } from "react-bootstrap";
import { useHttp } from "../hooks/useHttp";

export default function MainComponent() {
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  const [isLoaded, fetchedData] = useHttp(pokemonUrl, []); // fetch data with custom hook

  return (
    isLoaded &&
    fetchedData && (
      <Container>
        {fetchedData.data.results.map((pokemonData) => (
          <Pokemon key={pokemonData.name} pokemonData={pokemonData} />
        ))}
      </Container>
    )
  );
}
