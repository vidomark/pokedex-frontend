import React from "react";
import { Container } from "react-bootstrap";
import { useHttp } from "../hooks/useHttp";

export default function MainComponent() {
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  const [isLoaded, fetchedData] = useHttp(pokemonUrl, []); // fetch data with custom hook

  return (
    isLoaded &&
    fetchedData && (
      <Container>
        {fetchedData.data.results.forEach((pokemon) => console.log(pokemon))}
      </Container>
    )
  );
}
