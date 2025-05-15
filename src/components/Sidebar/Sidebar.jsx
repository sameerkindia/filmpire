import React, { useContext } from "react";
import { Link } from "react-router-dom";

import RedLogo from "./../../assets/red-logo.png";
import BlueLogo from "./../../assets/blue-logo.png";
import { ThemeContext } from "../../context/themeContext";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useGetGenresQuery } from "../../services/TMDB";

import generIcons from '../../assets/genres'

// const demoCategories = ["Comedy", "Action", "Horror", "Animation"]

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

// const demoCategories = [
//   { label: "Comady", value: "comady" },
//   { label: "Action", value: "action" },
//   { label: "Horror", value: "horror" },
//   { label: "Animation", value: "animation" },
// ];

const Sidebar = ({ setMobileOpen }) => {
  const { theme } = useContext(ThemeContext);
  const { data, isFetching } = useGetGenresQuery();

  // console.log(data);
  return (
    <>
      <Link
        to="/"
        className="imageLink flex items-center justify-center py-[10%] px-0"
      >
        <img
          className="image w-[70%]"
          src={theme === "dark" ? RedLogo : BlueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className="links" to="/">
            <ListItem onClick={() => {}}>
              <ListItemIcon>
                <img src={generIcons[label.toLowerCase()]} className="dark:invert-100" height={30} width={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data?.genres.map(({ name, id }) => (
            <Link key={id} className="links" to="/">
              <ListItem onClick={() => {}}>
                <ListItemIcon>
                <img src={generIcons[name.toLowerCase()]} className="dark:invert-100" height={30} width={30} />
              </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
