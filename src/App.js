import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const mappedMoviesData = data.results.map((data) => ({
      id: data.episode_id,
      title: data.title,
      releaseDate: data.release_date,
      openingText: data.opening_crawl,
    }));
    setMoviesData(mappedMoviesData);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchApiMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={moviesData} />}
        {!isLoading && moviesData.length===0 && <p>Not found moviesData</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
