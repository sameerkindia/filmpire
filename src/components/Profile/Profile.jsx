// import React from "react";
// import { useSelector } from "react-redux";
// import { userSelector } from "../../features/auth";
// import { Box, Button, Typography } from "@mui/material";
// import { ExitToApp } from "@mui/icons-material";

// const Profile = () => {
//   const { user } = useSelector(userSelector);

//   const favoriteMovies = [];

//   function logout() {
//     localStorage.clear();

//     window.location.href = "/";
//   }

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between">
//         <Typography variant="h4" gutterBottom>
//           My Profile
//         </Typography>
//         <Button color="inherit" onClick={logout}>
//           Logout &nbsp; <ExitToApp />
//         </Button>
//       </Box>

//       {!favoriteMovies.length ? (
//         <Typography variant="h5">
//           Add favorites or watchlist some Movies to see them here!
//         </Typography>
//       ) : (
//         <Box>FAVORITE MOVIES</Box>
//       )}
//     </Box>
//   );
// };

// export default Profile;


import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useSelector } from 'react-redux';

import { useGetListQuery } from '../../services/TMDB';
import RatedCards from '../RatedCards/RatedCards';

function Profile() {
  const { user } = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography className='dark:text-white' variant="h4" gutterBottom>My Profile</Typography>
        <Button className='dark:!text-white' color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length
        ? <Typography className='dark:text-white' variant="h5">Add favourite or watchlist same movies to see them here!</Typography>
        : (
          <Box>
            <RatedCards title="Favorite Movies" movies={favoriteMovies} />
            <RatedCards title="Watchlist" movies={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
}

export default Profile;
