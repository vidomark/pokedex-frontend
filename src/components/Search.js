import React from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { color } from "../util/hexColors";
import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function Search({ postData }) {
  const [typedLoaded, fetchedTypes] = useFetch(
    "http://localhost:8080/types",
    []
  );
  const [abilitiesLoaded, fetchedAbilities] = useFetch(
    "http://localhost:8080/abilities",
    []
  );

  const abilityStyle = {
    color: "#ddd",
    fontSize: "19px",
    marginRight: "10%",
    marginBottom: "10%",
    borderRadius: "10px",
  };

  const selectType = (type) => {
    const url = `http://localhost:8080/type/${type.name}`;
    postData(url, type);
  };

  const selectAbility = (ability) => {
    const url = `http://localhost:8080/ability/${ability.name}`;
    postData(url, ability);
  };

  return (
    typedLoaded &&
    fetchedTypes &&
    abilitiesLoaded &&
    fetchedAbilities && (
      <div className="dropdown-container">
        <div className="nav-type">
          {fetchedTypes.data.map((type) => (
            <NavDropdown.Item
              key={type.name}
              className="detail-name detail-name-nav"
              style={{ backgroundColor: color[type.name] }}
              onClick={() => selectType(type)}
            >
              <Link to="/">{capitalizeText(type.name)}</Link>
            </NavDropdown.Item>
          ))}
        </div>

        <div className="ability-search">
          <NavDropdown
            title={<div className="ability-search-title">Ability</div>}
            className="ability-dropdown"
          >
            {fetchedAbilities.data.map((ability) => (
              <NavDropdown.Item
                key={ability.name}
                style={abilityStyle}
                onClick={() => selectAbility(ability)}
              >
                <Link to="/">{capitalizeText(ability.name)}</Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </div>
      </div>
    )
  );
}
