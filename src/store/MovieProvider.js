import MovieContext from "./MovieContext";
import React, { useState, useCallback } from "react";

const url = `https://used-react-fetch-default-rtdb.firebaseio.com/movies`;

const MovieProvider = (props) => {
  const [movieState, setMovieState] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}.json`);
      if (!response.ok) throw new Error("Something went wrong");

      const data = await response.json();

      const allMoviesData = [];
      for (let key in data) {
        allMoviesData.unshift({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      // console.log(allMoviesData);.

      setMovieState(allMoviesData);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const addMovieHelper = (movies) => {
    setMovieState(movies);
  };
  const deleteMovieHandler = async (id) => {
    try {
      const responseDelete = await fetch(`${url}/${id}.json`, {
        method: "DELETE",
      });

      const response = await fetch(`${url}.json`);
      if (!response.ok || !responseDelete.ok)
        throw new Error("Something went wrong with the DELETE request");

      setMovieState((prevState) =>
        prevState.filter((movie) => movie.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };
  const errorHelper = (error) => {
    setError(error);
  };

  const isLoadingHelper = (isLoad) => {
    setIsLoading(isLoad);
  };

  return (
    <MovieContext.Provider
      value={{
        movies: movieState,
        addMovie: addMovieHelper,
        deleteMovie: deleteMovieHandler,
        fetchApiMovies: fetchApiMoviesHandler,
        isLoading: isLoading,
        isLoadingHelper: isLoadingHelper,
        error: error,
        errorHelper: errorHelper,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
