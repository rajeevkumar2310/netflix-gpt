import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "lang",
  initialState: {
    lang: "en",
    openAiApiKey: null,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    putApiKey: (state, action) => {
      state.openAiApiKey = action.payload;
    },
  },
});

export const { changeLanguage, putApiKey } = configSlice.actions;
export default configSlice.reducer;
