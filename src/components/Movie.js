import React, { useContext } from "react";
import MovieContext from "../store/MovieContext";
import classes from "./Movie.module.css";

const Movie = (props) => {
  const movieCtx = useContext(MovieContext);
  

  const deleteBtnHandler = async (id) => {
    movieCtx.deleteMovie(id);
  };

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        type="button"
        className={classes['delete-btn']}
        onClick={deleteBtnHandler.bind(null, props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
