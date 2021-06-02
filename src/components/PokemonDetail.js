import React from "react";
import { convertId } from "../util/idConverter";
import { capitalizeText } from "../util/textCapitalizer";
import { color } from "../util/hexColors";
import { Link } from "react-router-dom";

// array of details
export default function PokemonDetail({
  title,
  details,
  card = true,
  id = null,
  selectType,
}) {
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
          <Link
            to={`/`}
            key={detail.type.name}
            className={detailClassName}
            style={{ backgroundColor: color[detail.type.name] }}
            onClick={() => !card && selectType(detail)}
          >
            {capitalizeText(detail.type.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}
