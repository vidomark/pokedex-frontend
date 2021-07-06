import React from "react";
import { convertId } from "../../util/idConverter";
import { capitalizeText } from "../../util/textCapitalizer";
import { color } from "../../util/hexColors";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import axios from "axios";
import { useSetPokemons } from "../../contexts/PokemonListProvider";

// array of details
export default function PokemonDetail({
  title,
  details,
  card = true,
  id = null,
}) {
  const containerClassName = card ? null : "detail-container-profile";
  const detailTitleClassName = card ? "detail-title" : "detail-title-profile";
  const detailNameClassName = card ? "detail-name" : "detail-name-profile";
  const detailClassName = card ? "detail-detail" : "detail-detail-profile";
  const setPokemons = useSetPokemons();

  const filterPokemons = (url, data) => {
    axios
      .post(url, data)
      .then((result) => setPokemons(result.data))
      .catch(console.error());
  };

  return (
    <Grid container>
      <div className={containerClassName}>
        <Grid item>
          {card && <div className="detail-id">{convertId(id)}</div>}
          <div className={detailTitleClassName}>{capitalizeText(title)}</div>
        </Grid>
        <Grid>
          <div className={detailClassName}>
            {details.map((detail) => (
              <Link
                to={`/pokemon?type=${detail.type.name}`}
                key={detail.type.name}
                className={detailNameClassName}
                style={{ backgroundColor: color[detail.type.name] }}
                onClick={() =>
                  filterPokemons(
                    `http://localhost:8080/pokemon?type=${detail.type.name}`,
                    detail.type
                  )
                }
              >
                {capitalizeText(detail.type.name)}
              </Link>
            ))}
          </div>
        </Grid>
      </div>
    </Grid>
  );
}
