import React from "react";
import waterTypeImage from "../images/types/water-type.png";
import fireTypeImage from "../images/types/fire-type.jpeg";
import grassTypeImage from "../images/types/grass-type.png";
import normalTypeImage from "../images/types/normal-type.png";
import bugTypeImage from "../images/types/bug-type.png";
import poisonTypeImage from "../images/types/poison-type.webp";
import flyingTypeImage from "../images/types/flying-type.png";
import { capitalizeText } from "../util/textCapitalizer";
import { convertId } from "../util/idConverter";

// array of details
export default function PokemonDetail({
  title,
  details,
  card = true,
  id = null,
}) {
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
      {card && <div className="detail-id">{convertId(id)}</div>}
      <div className="detail-title">{capitalizeText(title)}</div>
      <div className="detail-detail">
        {details.map((detail) => (
          <div
            key={detail.type.name}
            className="detail-name"
            style={{ backgroundImage: `url(${image[detail.type.name]})` }}
          >
            {capitalizeText(detail.type.name)}
          </div>
        ))}
      </div>
    </div>
  );
}
