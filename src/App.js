import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesData, setMoviesData] = useState([]);

  const fetchApiMoviesHandler = async () => {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const mappedMoviesData = data.results.map((data) => ({
      id: data.episode_id,
      title: data.title,
      releaseDate: data.release_date,
      openingText: data.opening_crawl,
    }));
    setMoviesData(mappedMoviesData);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchApiMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={moviesData} />
      </section>
    </React.Fragment>
  );
}

export default App;
