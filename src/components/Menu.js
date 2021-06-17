import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Navbar,
  NavLink,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import Search from "./Search";
import imagePath from "../images/Pokemon_logo.svg";

export default function Menu({ postData, pokemonList, setPokemonList }) {
  const [registerHovered, setRegisterHovered] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [unfilteredList, setUnfilteredList] = useState(pokemonList);
  const [deleted, setDeleted] = useState(false);
  const [name, setName] = useState("");
  const firstUpdate = useRef(true);
  let nameMap = {};
  let savedLists = useMemo(() => {
    return new Array();
  }, []);

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
    if (firstUpdate.current) firstUpdate.current = false;
    else {
      let filteredList = pokemonList.filter((
        pokemon // filter pokemon list
      ) => pokemon.name.startsWith(name.toLowerCase()));
      setPokemonList(filteredList);

      nameMap[name] = filteredList;
      savedLists.push(nameMap); // push name tracker to list

      const previousList = savedLists.find((list) => Object.keys(list) == name);
      if (deleted) {
        // on backspace
        setDeleted(false);
        name.length === 0
          ? setPokemonList(unfilteredList)
          : setPokemonList(previousList[name]);
      }
    }
  }, [deleted, name]);

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
            Register
          </NavLink>
          <NavLink
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
            className="nav-item"
            style={navLinkStyle.login}
          >
            Login
          </NavLink>

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
            <Search postData={postData} />
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Enter name"
            className="mr-sm-2"
            onChange={(event) => searchByName(event)}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
