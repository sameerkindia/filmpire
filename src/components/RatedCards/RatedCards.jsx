import React from 'react';
import { Typography, Box } from '@mui/material';
import Movie from '../Movie/Movie';


function RatedCards({ title, movies }) {

  return (
    <Box>
      <Typography className='dark:text-white' variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" className="my-5 mx-0">
        {movies?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </Box>
    </Box>
  );
}

export default RatedCards;
