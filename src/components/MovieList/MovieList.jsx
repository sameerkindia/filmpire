import { Grid } from '@mui/material'
import Movie from '../Movie/Movie'

const MovieList = ({movies, numberOfMovies, excludeFirst }) => {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid container className="flex flex-wrap justify-between overflow-auto max-sm:justify-center">
    
      {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  );
}

export default MovieList