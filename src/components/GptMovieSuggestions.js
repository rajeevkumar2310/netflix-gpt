import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./movieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { gptMovieNames, gptMovies } = gpt;

  return (
    <div className="text-white bg-black bg-opacity-80">
      <div>
        {gptMovieNames.map((gptMovieName, index) => (
          <MovieList
            key={gptMovieName}
            title={gptMovieName}
            movies={gptMovies[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
