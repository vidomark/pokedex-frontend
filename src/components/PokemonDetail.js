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
    water: "#1b7ced",
    fire: "#b32100",
    grass: "#456613",
    normal: "#666666",
    bug: "#61370f",
    poison: "#60397f",
    flying: "#f4d600",
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
