import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Form from "./components/Form/Form";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiMoviesHandler = useCallback(async() => {
    setIsLoading(true);

    const response = await fetch("https://swapi.dev/api/films/");
    if (!response.ok) throw Error("Something went wrong ...Retrying");

    const data = await response.json();
    const mappedMoviesData = data.results.map((data) => ({
      id: data.episode_id,
      title: data.title,
      releaseDate: data.release_date,
      openingText: data.opening_crawl,
    }));
    setMoviesData(mappedMoviesData);
    setIsLoading(false);
  }, [setMoviesData]);

  useEffect(()=> {
    fetchApiMoviesHandler();
  }, [fetchApiMoviesHandler])

  return (
    <React.Fragment>
      <section>
        <Form/>
      </section>
      <section>
        <button onClick={fetchApiMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={moviesData} />}
        {!isLoading && moviesData.length === 0 && <p>Not found moviesData</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
