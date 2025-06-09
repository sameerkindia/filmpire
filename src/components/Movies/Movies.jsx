// import { MovieList } from ".."
import { Box, CircularProgress, Typography} from "@mui/material";
import { useGetMoviesQuery } from "../../services/TMDB";
import MovieList from "../MovieList/MovieList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import FeaturedMovie from "../FeaturedMovie/FeaturedMovie";
import useMediaQuery from "../../hooks/useMediaQuery";

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    searchQuery,
    page,
  });

  const isLargeScreen = useMediaQuery('(min-width:1200px) and (max-width:1535.98px)');

  const numberOfMovies = isLargeScreen ? 17 : 19;

  // const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  //   const numberOfMovies = lg ? 17 : 19;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data?.result?.length && isFetching) {
    return (
      <Box display="flex" justifyContent="center" mt="20px">
        <Typography variant="h4">
          No moives that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  return (
    <div>
    <FeaturedMovie movie={data.results[0]} />
      <MovieList movies={data} excludeFirst numberOfMovies={numberOfMovies}/>
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
