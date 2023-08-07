import React, {useContext} from 'react';
import Movie from './Movie';
import classes from './MoviesList.module.css';
import MovieContext from '../store/MovieContext';

const MovieList = (props) => {
  const movieCtx = useContext(MovieContext);

  return (
    <ul className={classes['movies-list']}>
      {movieCtx.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default React.memo(MovieList);
