import React from "react";

// array of details
export default function PokemonDetail({ title, details }) {
  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <div className="detail-container">
      <p className="detail-title">{capitalizeTitle(title)}</p>
      <div className="detail-detail">
        {details.map((detail) => (
          <div key={detail.type.name} className="detail-name">
            {detail.type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
