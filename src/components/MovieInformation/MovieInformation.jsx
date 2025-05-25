import { Link, useParams } from "react-router-dom";
import { useGetMovieQuery, useGetRecommendationQuery } from "../../services/TMDB";
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography } from "@mui/material";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";
import {
  Language,
  Theaters,
  Movie,
  FavoriteBorderOutlined,
  Favorite,
  Remove,
  PlusOne,
  ArrowBack,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import MovieList from "../MovieList/MovieList";
 

const apiKey = import.meta.env.VITE_TMDB_KEY


const MovieInformation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const { data, error, isFetching } = useGetMovieQuery(id);
  
  const { data: recommendations , isFetching: isRecommendationFetching } = useGetRecommendationQuery({
    list: "recommendations",
    movie_id: id,
  });


  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
       apiKey
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
       apiKey
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  console.log(data , "movie data")

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - go back</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      className="flex justify-around my-2.5 mx-0 max-sm:flex-col max-sm:flex-wrap"
    >
      <Grid size={{ sm: 12, lg: 4 }}>
        <img
          className="rounded-2xl shadow-2xl max-sm:w-full max-md:w-1/2 w-4/5 max-sm:my-0 max-sm:mx-auto max-md:h-[350px] max-sm:mb-8"
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid container direction="column" size={{ lg: 7 }}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid className="flex justify-around my-2.5 mx-0 max-sm:flex-col max-sm:flex-wrap">
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom className="!ml-5">
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data.runtime}min{" "}
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].name}`
              : ""}
          </Typography>
        </Grid>
        <Grid className="my-2.5 mx-0 flex justify-around flex-wrap">
          {data?.genres?.map((genre) => (
            <Link
              className="flex justify-center items-center max-sm:py-2 max-sm:px-4"
              key={genre.name}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className="dark:invert-100 mr-2.5 h-[30px]"
                // height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: "2rem" }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid container spacing={2}>
          {data &&
            data?.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      key={i}
                      size={{
                        xs: 4,
                        md: 2,
                      }}
                      component={Link}
                      to={`/actors/${character.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <img
                        className="w-full max-w-28 h-32 object-cover rounded-xl"
                        src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary" align="center">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary" align="center">
                        {character.character.split("/")[0]}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>
        <Grid container style={{ marginTop: "2rem" }}>
          <div
          className="flex justify-between w-full max-sm:flex-col"
          >
            <Grid
              size={{ xs: 12, sm: 6 }}
              className="flex justify-between w-full max-sm:flex-col"
            >
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<Movie />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }} 
            className="flex justify-between w-full max-sm:flex-col"
            >
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    variant="subtitle2"
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
       <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box>
      
      <Modal
        closeAfterTransition
        // className={classes.modal}
        className="flex items-center justify-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            // className={classes.video}
            className="w-[90%] sm:w-1/2 aspect-video"
            // frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
