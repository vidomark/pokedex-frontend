import React, { useState, useMemo, useEffect } from "react";
import {
  Navbar,
  NavLink,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import Search from "./Search";
import imagePath from "../images/Pokemon_logo.svg";
import { useRef } from "react";

export default function Menu() {
  const [registerHovered, setRegisterHovered] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const pokemons = usePokemons();
  const setPokemons = useSetPokemons();

  const [deleted, setDeleted] = useState(false);
  const [name, setName] = useState("");

  let unfilteredPokemons = useRef(null);
  let savedLists = useMemo(() => {
    return [];
  }, []);
  let nameMap = {};

  const navLinkStyle = {
    register: {
      color: registerHovered ? "white" : "#ddd",
    },
    login: {
      color: loginHovered ? "white" : "#ddd",
    },
    search: {
      color: searchHovered ? "white" : "#ddd",
    },
  };

  const searchByName = (event) => {
    setName(event.target.value); // current search

    // on backspace set deleted
    if (event.nativeEvent.inputType === "deleteContentBackward")
      setDeleted(true);
    else setDeleted(false);
  };

  useEffect(() => {
    if (pokemons) {
      // save unfiltered pokemons
      if (!savedLists.length) unfilteredPokemons.current = pokemons;

      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.startsWith(name.toLowerCase())
      );
      setPokemons(filteredPokemons);

      nameMap[name] = filteredPokemons;
      savedLists.push(nameMap); // push name tracker to list

      // on backspace
      if (deleted) {
        const previousList = savedLists.find(
          /* eslint-disable */
          (list) => Object.keys(list) == name
        );
        setDeleted(false);
        name.length === 0
          ? setPokemons(unfilteredPokemons.current)
          : setPokemons(previousList[name]);
      }
    }
    /* eslint-disable */
  }, [name]);

  return (
    <Navbar sticky="top" className="navbar" expand="lg">
      <Navbar.Brand href="/">
        <img className="navbar-picture" src={imagePath} alt="pokemon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            style={navLinkStyle.register}
            className="nav-item"
          >
            <Link to="/registration">Registration</Link>
          </NavLink>
          <NavLink
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
            className="nav-item"
            style={navLinkStyle.login}
          >
            <Link to="/login">Login</Link>
          </NavLink>

          {pokemons && (
            <NavDropdown
              title={
                <span
                  onMouseEnter={() => setSearchHovered(true)}
                  onMouseLeave={() => setSearchHovered(false)}
                  style={navLinkStyle.search}
                  className="dropdown-title"
                >
                  Advanced search
                </span>
              }
              id="basic-nav-dropdown"
              variant="primary"
              className="nav-dropdown nav-item"
            >
              <Search />
            </NavDropdown>
          )}
        </Nav>

        {pokemons && (
          <Form inline>
            <FormControl
              type="text"
              placeholder="Enter name"
              className="mr-sm-2"
              onChange={(event) => searchByName(event)}
            />
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
