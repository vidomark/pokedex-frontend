import React, { useState } from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { color } from "../util/hexColors";
import { NavDropdown, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSetPokemons } from "../contexts/PokemonListProvider";
import { useEffect } from "react";
import { fetchData } from "../util/api";
import { dropdownItemStyle } from "../util/style";
import { postData } from "../util/api";
import pokeball from "../images/pokeball-icon.svg";
import token from "../util/token";

export default function Search() {
  const setPokemons = useSetPokemons();
  const [types, setTypes] = useState(null);
  const [abilites, setAbilites] = useState(null);

  const filterPokemons = (url, data) => {
    const header = { Authorization: `Bearer ${token.getToken()}` };
    postData(url, data, header).then((result) => setPokemons(result.data));
  };

  useEffect(() => {
    // Every type
    const typesUrl = "http://localhost:8080/pokemon/types";
    const header = { Authorization: `Bearer ${token.getToken()}` };
    fetchData(typesUrl, header)
      .then((result) => setTypes(result.data))
      .catch((error) => console.log(error));

    // Every ability
    const abilitiesUrl = "http://localhost:8080/pokemon/abilities";
    fetchData(abilitiesUrl, header)
      .then((result) => setAbilites(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    types &&
    abilites && (
      /* type search */
      <div className="dropdown-container">
        <div className="nav-type">
          {types.map((type) => (
            <NavDropdown.Item
              key={type.name}
              className="detail-name detail-name-nav"
              style={{ backgroundColor: color[type.name] }}
              onClick={() => {
                const url = `http://localhost:8080/pokemon?type=${type.name}`;
                filterPokemons(url, type);
              }}
            >
              <Link to={`/pokemon?type=${type.name}`}>
                {capitalizeText(type.name)}
              </Link>
            </NavDropdown.Item>
          ))}
        </div>

        {/* ability search */}
        <div className="ability-search">
          <div className="search-title">Ability</div>
          <DropdownButton
            variant="outline-primary"
            title={
              <span>
                <img src={pokeball} className="pokeball-icon" alt="pokeball" />
                <span className="ability-title-button">Abilities</span>
              </span>
            }
          >
            <div style={{ height: "300px", overflowY: "auto" }}>
              {abilites.map((ability) => (
                <Dropdown.Item
                  key={ability.name}
                  style={dropdownItemStyle}
                  onClick={() => {
                    const url = `http://localhost:8080/pokemon?ability=${ability.name}`;
                    filterPokemons(url, ability);
                  }}
                >
                  <Link to={`/pokemon?ability=${ability.name}`}>
                    {capitalizeText(ability.name)}
                  </Link>
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
        </div>
      </div>
    )
  );
}
