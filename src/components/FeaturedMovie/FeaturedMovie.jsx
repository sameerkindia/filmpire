import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

function FeaturedMovie({ movie }) {
  if (!movie) return null;

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className="mb-5 flex justify-center h-[490px] relative"
    >
      <Card className="w-full flex justify-end flex-col" classes="relative">
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          className="absolute top-0 right-0 h-full w-full bg-[rgba(0,0,0,0.575)] bg-blend-darken"
        />
        <Box padding="20px">
          <CardContent
            className="text-white w-full lg:w-2/5 relative z-10"
            classes="relative bg-transparent"
          >
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default FeaturedMovie;
