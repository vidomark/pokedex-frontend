import React from 'react';

export default function Footer() {
  return (
    <div style={footerStyle}>
      <h1>GOTTA CATCH 'EM ALL!</h1>
      <h2> Pokékodex Brought to you by Vido and Zang</h2>
      <p>
        This is a pokemon overview site, that uses pokeApi, as the main source
        of information!
      </p>
    </div>
  );
}

const footerStyle = {
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
  background: '#f3f3f3',
  color: 'black',
  textAlign: 'center',
};
