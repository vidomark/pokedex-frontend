import React from "react";
import { convertId } from "../util/idConverter";

// array of details
export default function PokemonDetail({
  title,
  details,
  card = true,
  id = null,
}) {
  const capitalizeText = (title) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const color = {
    water: "#001687",
    fire: "#b32100",
    grass: "#456613",
    normal: "#c678dd",
    bug: "#111111",
    poison: "#60397f",
    flying: "#f4d600",
    electric: "#0892d0",
    ground: "#61370f",
    fairy: "#f7d8ba",
    fighting: "#4c0013",
    psychic: "#0c1c1c",
    rock: "#8c9399",
    ice: "#a5f2f3",
    ghost: "#333333",
    dragon: "#377455",
    steel: "#43464b",
    dark: "#000000",
  };

  const containerClassName = card
    ? "detail-container"
    : "detail-container profile";

  const detailClassName = card ? "detail-name" : "detail-name profile";

  return (
    <div className={containerClassName}>
      {card && <div className="detail-id">{convertId(id)}</div>}
      <div className="detail-title">{capitalizeText(title)}</div>
      <div className="detail-detail">
        {details.map((detail) => (
          <div
            key={detail.type.name}
            className={detailClassName}
            style={{ backgroundColor: color[detail.type.name] }}
          >
            {capitalizeText(detail.type.name)}
          </div>
        ))}
      </div>
    </div>
  );
}
