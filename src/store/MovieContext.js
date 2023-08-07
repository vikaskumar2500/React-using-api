import React from "react";

const MovieContext = React.createContext({
  movies: [],
  addMovie: () => {},
  deleteMovie: () => {},
  fetchApiMovies: () => {},
  isLoading: null,
  isLoadingHelper: () => {},
  error: null,
  errorHelper: () => {},
});

export default MovieContext;
