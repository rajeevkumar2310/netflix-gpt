import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { loadGptMovieSuggestions } from "../utils/gptSlice";
import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  const movieSuggestions = useSelector((store) => store.gpt.gptMovies);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    //Make an API call to GPT API and get movie results
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated for example: Raja Babu, Rajendrudu Gajendrudu, Roja, Mayalodu, Peddarikam";
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");
    const promiseArray = gptMovies.map((movie) =>
      searchMovieTMDB(movie.trim())
    );
    // [Promise,Promise,Promise,Promise,Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log("tmdb-results - ", tmdbResults);
    // dispatch(loadGptMovieNames(gptMovies));
    dispatch(
      loadGptMovieSuggestions({
        movieNames: gptMovies,
        movieResults: tmdbResults,
      })
    );
  };
  return (
    <div className="pt-[10%]">
      <form
        className="bg-black p-2 w-1/2 m-auto flex justify-between"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-2 m-2 w-3/4 rounded-lg"
          type="text"
          placeholder={lang[language].gptSearchPlaceHolder}
        />
        <button
          className="bg-red-700 px-10 py-2 m-auto text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
      {movieSuggestions && <GptMovieSuggestions />}
    </div>
  );
};

export default GptSearchBar;
