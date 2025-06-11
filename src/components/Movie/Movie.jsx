import { Grid, Grow, Rating, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Movie = ({ movie, i }) => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} className="p-2.5 justify-items-center">
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link
          className="links items-center font-bold sm:flex flex-col hover:cursor-pointer"
          to={`/movie/${movie.id}`}
        >
          {movie.poster_path ? (
            <img
              alt={movie.title}
              className="image rounded-[20px] h-[300px] mb-2.5 hover:scale-105"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            />
          ) : (
            <img
              alt={movie.title}
              className="image rounded-[20px] h-[300px] mb-2.5 hover:scale-105"
              src="https://www.fillmurray.com/200/300"
            />
          )}
        </Link>
      </Grow>
      <Typography
        variant="h5"
        className="text-primary truncate w-[230px] mt-2.5 mb-0 text-center dark:!text-white"
      >
        {movie.title}
      </Typography>
      <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
        <div>
          <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default Movie;
