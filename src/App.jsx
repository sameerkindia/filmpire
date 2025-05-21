import "./App.css";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import Movies from "./components/Movies/Movies";
import MovieInformation from "./components/MovieInformation/MovieInformation";
import Navbar from "./components/Navbar/Navbar";
import Actors from "./components/Actors/Actors";
import Profile from "./components/Profile/Profile";
// import { Actors, MovieInformation, Movies, Profile } from "./components";

function App() {

  return (
    <>
      <div className="flex h-full">
        <CssBaseline />
        <Navbar />
        <main className="grow mt-[70px]">
        <div className="p-8">
        <Routes>
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/approved" element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<Actors />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
        </div>
        </main>
      </div>
    </>
  );
}

export default App;
