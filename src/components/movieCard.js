import React from "react";
import { TMDB_IMG_URL } from "../utils/constants";

const MovieCard = ({ movieCard }) => {
  if (!movieCard.poster_path) return null;
  return (
    <div className="w-36 h-24 md:w-52 md:h-36 pr-4 ">
      <img
        className="rounded-lg"
        alt="This is kpve"
        src={TMDB_IMG_URL + movieCard.poster_path}
      />
    </div>
  );
};

export default MovieCard;
