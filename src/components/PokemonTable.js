import React from "react";
import { capitalizeText } from "../util/textCapitalizer";

export default function PokemonTable({ pokemon }) {
  return (
    <table className="pokemon-table">
      <tbody>
        <tr>
          <th>Species</th>
          <th>Base experience</th>
        </tr>
        <tr>
          <td>{capitalizeText(pokemon.species.name)}</td>
          <td>{pokemon.base_experience}</td>
        </tr>
        <tr>
          <th>Height</th>
          <th>Weight</th>
        </tr>
        <tr>
          <td>{pokemon.height}</td>
          <td>{pokemon.weight}</td>
        </tr>
        <tr>
          <th>Abilities</th>
        </tr>
        {pokemon.abilities.map((ability) => {
          ability = ability.ability;
          return (
            <tr key={ability.name}>
              <td>{capitalizeText(ability.name)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
