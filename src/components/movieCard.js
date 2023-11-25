import React from "react";
import { TMDB_IMG_URL } from "../utils/constants";

const MovieCard = ({ movieCard }) => {
  return (
    <div className="w-52 h-36 pr-4 ">
      <img
        className="rounded-lg"
        alt="This is kpve"
        src={TMDB_IMG_URL + movieCard.poster_path}
      />
    </div>
  );
};

export default MovieCard;
