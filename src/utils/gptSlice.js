import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovieNames: null,
    gptMovies: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },

    // loadGptMovieNames: (state, action) => {
    //   state.gptMovieNames = action.payload;
    // },
    loadGptMovieSuggestions: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.gptMovies = movieResults;
      state.gptMovieNames = movieNames;
    },
  },
});

export const {
  toggleGptSearchView,
  loadGptMovieSuggestions,
  // loadGptMovieNames,
} = gptSlice.actions;

export default gptSlice.reducer;
