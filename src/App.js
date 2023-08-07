import React, { useEffect, useContext, useCallback } from "react";
import MovieContext from "./store/MovieContext";
import MoviesList from "./components/MoviesList";
import "./App.css";
import Form from "./components/Form/Form";

function App() {
  const movieCtx = useContext(MovieContext);

  const addMovieButtonHandler = useCallback(() => {
    movieCtx.fetchApiMovies();
  }, [movieCtx]);

  useEffect(() => {
    movieCtx.fetchApiMovies();
  }, []);

  return (
    <React.Fragment>
      <section>
        <Form onAddMovie={addMovieButtonHandler} />
      </section>
      <section>
        <button onClick={movieCtx.fetchApiMovies}>Fetch Movies</button>
      </section>
      <section>
        {!movieCtx.isLoading && <MoviesList />}
        {!movieCtx.isLoading && movieCtx.movies.length === 0 && (
          <p>Not found moviesData</p>
        )}
        {!movieCtx.isLoading && movieCtx.error && <p>{movieCtx.error}</p>}
        {movieCtx.isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
