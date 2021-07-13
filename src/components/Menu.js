import React, { useState, useMemo, useEffect } from "react";
import {
  Navbar,
  NavLink,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { usePokemons, useSetPokemons } from "../contexts/PokemonListProvider";
import { useRef } from "react";
import imagePath from "../images/Pokemon_logo.svg";
import auth from "../util/authentication";
import Search from "./Search";

function Menu(props) {
  const [linkOneHovered, setLinkOneHovered] = useState(false);
  const [linkTwoHovered, setLinkTwoHovered] = useState(false);
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
    linkOne: {
      color: linkOneHovered ? "white" : "#ddd",
    },
    linkTwo: {
      color: linkTwoHovered ? "white" : "#ddd",
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

  const logout = () => {
    auth.logout(() => props.history.push("/"));
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
            onMouseEnter={() => setLinkOneHovered(true)}
            onMouseLeave={() => setLinkOneHovered(false)}
            style={navLinkStyle.linkOne}
            className="nav-item"
          >
            {auth.isAuthenticated() && <Link to="/profile">Profile</Link>}
            {!auth.isAuthenticated() && (
              <Link to="/registration">Registration</Link>
            )}
          </NavLink>

          <NavLink
            onMouseEnter={() => setLinkTwoHovered(true)}
            onMouseLeave={() => setLinkTwoHovered(false)}
            className="nav-item"
            style={navLinkStyle.linkTwo}
          >
            {auth.isAuthenticated() && (
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            )}
            {!auth.isAuthenticated() && <Link to="/login">Login</Link>}
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

export default withRouter(Menu);
