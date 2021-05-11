import React from "react";

// array of details
export default function PokemonDetail({ title, details }) {
  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <div className="pokemon-detail">
      <p>{capitalizeTitle(title)}</p>
      <div className="detail-name-container">
        {details.map((detail) => (
          <div key={detail.type.name} className="detail-name">
            {detail.type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
