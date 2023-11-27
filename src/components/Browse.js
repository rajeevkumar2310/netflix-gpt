import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../customhooks/useGetResults";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./secondaryContainer";
import usePopularMovies from "../customhooks/usePopularMovies";
import useTopRatedMovies from "../customhooks/useTopRatedMovies";
import useUpcomingMovies from "../customhooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  const gptSearch = useSelector((store) => store.gpt?.showGptSearch);
  return (
    <div className="bg-black">
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
