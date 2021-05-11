import React from "react";

// array of details
export default function PokemonDetail({ title, details }) {
  const capitalizeText = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const color = {
    water: "#1b7ced",
    fire: "#b32100",
    grass: "#456613",
    normal: "#666666",
    bug: "#61370f",
    poison: "#60397f",
    flying: "#f4d600",
  };

  return (
    <div className="detail-container">
      <p className="detail-title">{capitalizeText(title)}</p>
      <div className="detail-detail">
        {details.map((detail) => (
          <div
            key={detail.type.name}
            className="detail-name"
            style={{ backgroundColor: color[detail.type.name] }}
          >
            {capitalizeText(detail.type.name)}
          </div>
        ))}
      </div>
    </div>
  );
}
