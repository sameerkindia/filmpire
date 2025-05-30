// import "./App.css";
// import { CssBaseline } from "@mui/material";
// import { Route, Routes } from "react-router-dom";

// import Movies from "./components/Movies/Movies";
// import MovieInformation from "./components/MovieInformation/MovieInformation";
// import Navbar from "./components/Navbar/Navbar";
// import Actors from "./components/Actors/Actors";
// import Profile from "./components/Profile/Profile";
// // import Profile from "./components/Profile/Profile";
// // import { Actors, MovieInformation, Movies, Profile } from "./components";

// function App() {

//   return (
//     <>
//       <div className="flex h-full">
//         <CssBaseline />
//         <Navbar />
//         <main className="grow mt-[70px]">
//         <div className="p-8 dark:!bg-[#121212]">
//         <Routes>
//           <Route exact path="/" element={<Movies />} />
//           <Route exact path="/approved" element={<Movies />} />
//           <Route exact path="/movie/:id" element={<MovieInformation />} />
//           <Route exact path="/actors/:id" element={<Actors />} />
//           <Route exact path="/profile/:id" element={<Profile />} />
//         </Routes>
//         </div>
//         </main>
//       </div>
//     </>
//   );
// }

// export default App;


import "./App.css";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar/Navbar";

// Lazy loaded components
const Movies = lazy(() => import("./components/Movies/Movies"));
const MovieInformation = lazy(() => import("./components/MovieInformation/MovieInformation"));
const Actors = lazy(() => import("./components/Actors/Actors"));
const Profile = lazy(() => import("./components/Profile/Profile"));

function App() {
  return (
    <>
      <div className="flex h-full">
        <CssBaseline />
        <Navbar />
        <main className="grow mt-[70px]">
          <div className="p-8 dark:!bg-[#121212]">
            {/* Suspense handles fallback UI while components load */}
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<Movies />} />
                <Route exact path="/approved" element={<Movies />} />
                <Route exact path="/movie/:id" element={<MovieInformation />} />
                <Route exact path="/actors/:id" element={<Actors />} />
                <Route exact path="/profile/:id" element={<Profile />} />
              </Routes>
            </Suspense>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;