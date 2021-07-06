import React, { useState, useContext, createContext } from "react";
import { loadedPokemonNumber } from "../util/pokemonConfig";

const UrlContext = createContext();
const SetUrlContext = createContext();

export const useUrl = () => {
  return useContext(UrlContext);
};

export const useSetUrl = () => {
  return useContext(SetUrlContext);
};

export default function UrlProvider({ children }) {
  const [url, setUrl] = useState(
    `http://localhost:8080/pokemon?limit=${loadedPokemonNumber}`
  );

  return (
    <UrlContext.Provider value={url}>
      <SetUrlContext.Provider value={setUrl}>{children}</SetUrlContext.Provider>
    </UrlContext.Provider>
  );
}
