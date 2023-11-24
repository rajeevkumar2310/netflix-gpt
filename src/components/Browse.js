import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhooks/useGetResults";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./secondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div>
      <Header />
      {/* - Main video container
          - video background
          - video title
          - Secondary Container
          - MovieList * n
          - Cards * n
        */}
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
