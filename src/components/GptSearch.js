import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BACKGROUND_IMG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={BACKGROUND_IMG_URL} alt="background" />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
