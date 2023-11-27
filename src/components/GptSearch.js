import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BACKGROUND_IMG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen md:w-screen object-cover"
          src={BACKGROUND_IMG_URL}
          alt="background"
        />
      </div>
      <div>
        <GptSearchBar />
      </div>
    </>
  );
};

export default GptSearch;
