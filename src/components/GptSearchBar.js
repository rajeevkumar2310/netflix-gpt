import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%]">
      <form className="bg-black p-2 w-1/2 m-auto flex justify-between">
        <input
          className="p-2 m-2 w-3/4 rounded-lg"
          type="text"
          placeholder={lang[language].gptSearchPlaceHolder}
        />
        <button className="bg-red-700 px-10 py-2 m-auto text-white rounded-lg">
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
