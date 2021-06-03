import React from "react";
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
  const searchByName = (name) => {
    /* pokemonList.forEach((pokemon) => {
      if (pokemon.name.includes(name.toLowerCase())) console.log(pokemon);
    }); */
    let filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.includes(name.toLowerCase())
    );
    setPokemonList(filteredList);
  };

  return (
    <Navbar className="navbar" expand="lg">
      <Navbar.Brand href="/">
        <img className="navbar-picture" src={imagePath} alt="pokemon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink style={{ color: "#ddd" }} className="nav-item">
            Register
          </NavLink>
          <NavLink style={{ color: "#ddd" }} className="nav-item">
            Login
          </NavLink>

          <NavDropdown
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
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}
