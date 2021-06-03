import React, { useState } from "react";
import {
  Navbar,
  NavLink,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Search from "./Search";
import imagePath from "../images/Pokemon_logo.svg";

export default function Menu({ postData, pokemonList, setPokemonList }) {
  const [registerHovered, setRegisterHovered] = useState(false);
  const [loginHovered, setLoginHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);

  const navLinkStyle = {
    register: {
      color: registerHovered ? "white" : "#ddd",
      transform: registerHovered ? "scale(1.06)" : null,
      transition: registerHovered ? "0.2s linear" : null,
    },
    login: {
      color: loginHovered ? "white" : "#ddd",
      transform: loginHovered ? "scale(1.06)" : null,
      transition: loginHovered ? "0.2s linear" : null,
    },
    search: {
      color: searchHovered ? "white" : "#ddd",
      transform: searchHovered ? "scale(1.06)" : null,
      transition: searchHovered ? "0.2s linear" : null,
    },
  };

  const searchByName = (name) => {
    let filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.includes(name.toLowerCase())
    );
    setPokemonList(filteredList);
  };

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
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
            style={navLinkStyle.search}
            title={<span className="dropdown-title">Advanced search</span>}
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
            onChange={(event) => searchByName(event.target.value)}
          />
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
