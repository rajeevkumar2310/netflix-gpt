import React from "react";
import MovieCard from "./movieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="bg-black bg-opacity-0">
      <h3 className="text-xl py-6 text-white">{title}</h3>
      <div className="flex overflow-x-scroll overflow-hidden no-scrollbar">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movieCard={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
