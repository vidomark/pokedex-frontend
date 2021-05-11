import React from "react";
import waterTypeImage from "../images/types/water-type.png";
import fireTypeImage from "../images/types/fire-type.jpeg";
import grassTypeImage from "../images/types/grass-type.png";
import normalTypeImage from "../images/types/normal-type.png";
import bugTypeImage from "../images/types/bug-type.png";
import poisonTypeImage from "../images/types/poison-type.webp";
import flyingTypeImage from "../images/types/flying-type.png";

// array of details
export default function PokemonDetail({ title, details }) {
  const capitalizeTitle = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const image = {
    water: waterTypeImage,
    fire: fireTypeImage,
    grass: grassTypeImage,
    normal: normalTypeImage,
    bug: bugTypeImage,
    poison: poisonTypeImage,
    flying: flyingTypeImage,
  };

  return (
    <div className="detail-container">
      <p className="detail-title">{capitalizeTitle(title)}</p>
      <div className="detail-detail">
        {details.map((detail) => (
          <div
            key={detail.type.name}
            className="detail-name"
            style={{ backgroundImage: `url(${image[detail.type.name]})` }}
          >
            {detail.type.name}
          </div>
        ))}
      </div>
    </div>
  );
}
