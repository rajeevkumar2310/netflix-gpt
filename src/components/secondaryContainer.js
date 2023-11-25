import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./movieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies &&
    movies.popularMovies &&
    movies.topRatedMovies &&
    movies.upcomingMovies && (
      <div className=" bg-black">
        <div className="-mt-24 pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
        {/* movie lists * n
    trending
    horror
    comedy
    popular
    top list
    */}
      </div>
    )
  );
};

export default SecondaryContainer;
