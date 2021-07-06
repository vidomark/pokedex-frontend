import React from "react";
import axios from "axios";
import { capitalizeText } from "../util/textCapitalizer";
import { color } from "../util/hexColors";
import { NavDropdown, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import pokeball from "../images/pokeball-icon.svg";
import { useSetPokemons } from "../contexts/PokemonListProvider";

export default function Search() {
  const setPokemons = useSetPokemons();
  const fetchedTypes = useFetch("http://localhost:8080/pokemon/types", []);
  const fetchedAbilities = useFetch(
    "http://localhost:8080/pokemon/abilities",
    []
  );

  const dropdownItemStyle = {
    color: "#ddd",
    fontSize: "19px",
    marginRight: "10%",
    marginBottom: "10%",
    borderRadius: "10px",
  };

  const filterPokemons = (url, data) => {
    axios
      .post(url, data)
      .then((result) => setPokemons(result.data))
      .catch(console.error());
  };

  return (
    fetchedTypes &&
    fetchedAbilities && (
      /* type search */
      <div className="dropdown-container">
        <div className="nav-type">
          {fetchedTypes.data.map((type) => (
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
              {fetchedAbilities.data.map((ability) => (
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
