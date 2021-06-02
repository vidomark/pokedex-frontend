import React, { useState } from "react";
import { capitalizeText } from "../util/textCapitalizer";
import { color } from "../util/hexColors";
import { NavDropdown, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import pokeball from "../images/pokeball-icon.svg";

export default function Search({ postData }) {
  const [typesLoaded, fetchedTypes] = useFetch(
    "http://localhost:8080/types",
    []
  );
  const [abilitiesLoaded, fetchedAbilities] = useFetch(
    "http://localhost:8080/abilities",
    []
  );

  const [selectedAbility, setSelectedAbility] = useState(null);

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
    setSelectedAbility(ability);
    postData(url, ability);
  };

  return (
    typesLoaded &&
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
          <div className="ability-search-title">Ability</div>
          <DropdownButton
            variant="outline-primary"
            title={
              <span>
                <img src={pokeball} className="pokeball-icon" alt="pokeball" />
                <span className="ability-title-button">
                  {selectedAbility
                    ? capitalizeText(selectedAbility.name)
                    : "All"}
                </span>
              </span>
            }
          >
            <div style={{ height: "300px", overflowY: "auto" }}>
              {fetchedAbilities.data.map((ability) => (
                <Dropdown.Item
                  key={ability.name}
                  style={abilityStyle}
                  onClick={() => selectAbility(ability)}
                >
                  <Link to="/">{capitalizeText(ability.name)}</Link>
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
        </div>
      </div>
    )
  );
}
