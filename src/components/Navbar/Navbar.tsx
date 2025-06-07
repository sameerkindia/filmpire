import {
  AccountCircle,
  Brightness3,
  Brightness4,
  Brightness5,
  Brightness7,
  Menu,
  Person,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "../Search/Search";
import { createSessionId, fetchToken, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../../features/auth";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  // useEffect(() => {
  //   const loginUser = async () => {
  //     if (token) {
  //       if (sessionIdFromLocalStorage) {
  //         if (sessionIdFromLocalStorage) {
  //           const { data: userData } = await moviesApi.get(
  //             `/account?session_id=${sessionIdFromLocalStorage}`
  //           );
  //           dispatch(setUser(userData));
  //         } else {
  //           const sessionId = await createSessionId();
  //           const { data: userData } = await moviesApi.get(
  //             `/account?session_id=${sessionId}`
  //           );
  //           dispatch(setUser(userData));
  //         }
  //       }
  //     }
  //   };

  //   loginUser();
  // }, [token]);

  useEffect(() => {
      const logInUser = async () => {
        if (token) {
          if (sessionIdFromLocalStorage) {
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
            dispatch(setUser(userData));
          } else {
            const sessionId = await createSessionId();
            const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
            dispatch(setUser(userData));
          }
        }
      };
  
      logInUser();
    }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className="h-20 flex max-sm:flex-wrap justify-between sm:ml-60 dark:!bg-[#272727]">
          <IconButton
            color="inherit"
            edge="start"
            className="outline-none max-sm:mr-0 sm:!hidden"
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            <Menu />
          </IconButton>

          <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleTheme}>
            {theme === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <SearchBar customClass="max-sm:hidden" />
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                href={`/profile/${user?.id}`}
                className="hover:text-white hover:no-underline"
                onClick={() => {}}
              >
                <span className="max-sm:hidden">My Movies &nbsp; </span>
                <Avatar
                  className="h-[30px] w-[30px]"
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          <SearchBar customClass="sm:hidden" />
        </Toolbar>
      </AppBar>
      <div>
        <nav className="drawer sm:w-60 shrink-0 bg-white ">
          <Drawer
            variant="temporary"
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen((isOpen) => !isOpen)}
            className="sm:!hidden drawerBackground"
            ModalProps={{ keepMounted: true }}
            classes={{ paper: "drawerPaper w-60 dark:!bg-[#121212]" }}
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </Drawer>

          <Drawer
            variant="permanent"
            anchor="left"
            open
            className="max-sm:!hidden"
            classes={{ paper: "drawerPaper w-60 dark:!bg-[#121212]" }}
          >
            <Sidebar setMobileOpen={setMobileOpen} />
          </Drawer>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
