import { configureStore } from "@reduxjs/toolkit";
import spotifyReducer from "./slices/albumsSlice/albumsSlice";

const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});

export default store;