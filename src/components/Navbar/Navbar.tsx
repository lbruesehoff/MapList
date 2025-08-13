import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setUser } from "../../store/global-store";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getUserTheme,
  updateUserTheme,
} from "../../google/Fire-Store/database-calls";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const userFireStore = auth.currentUser;
  const user = useSelector((state: any) => state.global.user);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;

    dispatch(setTheme(selectedTheme)); // Update the theme in the Redux store
    if (user) {
      updateUserTheme(selectedTheme); // Update the theme in Firestore
    }
    document.documentElement.setAttribute("data-theme", event.target.value);
  };

  // Fetch user theme when user is signed in
  useEffect(() => {
    if (userFireStore) {
      getUserTheme(userFireStore.uid).then((theme) => {
        dispatch(setTheme(theme));
        document.documentElement.setAttribute("data-theme", theme || "light");
      });
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            {user && (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Map List</a>
      </div>
      <div className="navbar-end nav-bar-end-buttons">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl"
          >
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Light"
                value="light"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Retro"
                value="retro"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="CupCake"
                value="cupcake"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Synthwave"
                value="synthwave"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Abyss"
                value="abyss"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Cyberpunk"
                value="cyberpunk"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Black"
                value="black"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Forest"
                value="forest"
                onChange={handleThemeChange}
              />
            </li>
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                aria-label="Nord"
                value="nord"
                onChange={handleThemeChange}
              />
            </li>
          </ul>
        </div>
        {user && (
          <button onClick={handleLogout} className="btn btn-primary logout">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
