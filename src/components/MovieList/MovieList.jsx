import { Grid } from '@mui/material'
import React from 'react'
import Movie from '../Movie/Movie'
// import { Movie } from '..'

const MovieList = ({movies, numberOfMovies}) => {
  return (
    <Grid container className="moviesContainer flex flex-wrap justify-between overflow-auto max-sm:justify-center">
    {movies.results.slice(0 , numberOfMovies).map((movie, i)=>(
        <Movie key={i} movie={movie} i={i} />
    ))}
    </Grid>
  )
}

export default MovieList