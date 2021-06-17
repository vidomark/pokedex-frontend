import React from "react";
import { capitalizeText } from "../util/textCapitalizer";
import "../css/App.css";

export default function PokemonTable({ pokemon }) {
  return (
    <div className="pokemon-table-contrainer">
      <table className="pokemon-table">
        <tbody>
          <tr className="pokemon-table-row">
            <td>Species</td>
            <td>Base experience</td>
          </tr>
          <tr>
            <th>{capitalizeText(pokemon.species.name)}</th>
            <th>{pokemon.baseExperience}</th>
          </tr>
          <tr>
            <td>Height</td>
            <td>Weight</td>
          </tr>
          <tr>
            <th>{pokemon.height}</th>
            <th>{pokemon.weight}</th>
          </tr>
          <tr>
            <td>Abilities</td>
            <td></td>
          </tr>
          {pokemon.abilities.map((ability) => {
            ability = ability.ability;
            return (
              <tr key={ability.name}>
                <th>{capitalizeText(ability.name)}</th>
                <th></th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
