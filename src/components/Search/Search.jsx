import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovie } from "../../features/currentGenreOrCategory";

const SearchBar = ({customClass}) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
        dispatch(searchMovie(query))
    }
  };
  return (
    <div className={`searchContainer max-sm:flex justify-center w- full ${customClass}`}>
      <TextField
        value={query}
        onKeyDown={handleKeyPress}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        slotProps={{
          input: {
            // maxLength: 50,
            className: '-mt-2.5 max-sm:mb-2.5 invert-100',
            // dark:text-white invert-100 dark:invert-0 dark:!border-b-white
            startAdornment: (
                <InputAdornment position="start" className="">
                <Search />
                </InputAdornment>
            )
            // dark:!border-b-white !border-b-white dark:!invert-100
          },
        }}
      ></TextField>
      <br />
    </div>
  );
};

export default SearchBar;
