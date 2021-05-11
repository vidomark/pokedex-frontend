import React from 'react';
import { Card } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { card } from '../css/App.css';

export default function Pokemon(props) {
  const { name, url } = props.pokemonData;
  const [isLoaded, pokemon] = useFetch(url, []);
  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    isLoaded &&
    pokemon && (
      <div className='card-container'>
        <Card className='card'>
          <Link to='/profile' style={card}>
            <Card.Img src={pokemon.data.sprites.front_default} alt='pokemon' />
          </Link>
        </Card>
        <p style={{ textAlign: 'left' }}>{capitalizeName(name)}</p>
        <div style={{ align: 'left' }} className='pokemon-type'>
          {pokemon.data.types.map((type) => (
            <div
              style={{ textAlign: 'intial' }}
              className='type'
              key={type.type.name}
            >
              {type.type.name}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
