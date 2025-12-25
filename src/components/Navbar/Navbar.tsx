import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, setTheme, setUser } from "../../store/global-store";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getUserTheme,
  updateUserTheme,
} from "../../google/Fire-Store/database-calls";
import { Themes, LandingThemes } from "../../themes/theme-types";
import logo from "../../assets/images/maplist-logo.png";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const userFireStore = auth.currentUser;
  const user = useSelector((state: any) => state.global.user);
  const getTheme = useSelector((state: any) => state.global.theme);

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

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const handleScrollToMemberships = () => {
    const el = document.getElementById("memberships");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("memberships");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearStore());
        document.documentElement.setAttribute("data-theme", "light"); // Clear the Redux store
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
            {user ? (
              <>
                <li onClick={() => navigateTo("/home")}>
                  <a>Map</a>
                </li>

                <li onClick={() => navigateTo("/memberships")}>
                  <a>Memberships</a>
                </li>
                <li onClick={() => navigateTo("/settings")}>
                  <a>Settings</a>
                </li>
                <li onClick={() => navigateTo("/contact")}>
                  <a>Contact Us</a>
                </li>

                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => navigateTo("/")}>
                  <a>Home</a>
                </li>
                <li onClick={handleScrollToMemberships}>
                  <a>Memberships</a>
                </li>
                <li onClick={() => navigateTo("/contact")}>
                  <a>Contact Us</a>
                </li>
                <li onClick={() => navigateTo("/login")}>
                  <a>Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">
          <span>
            <img className="logo" src={logo} alt="Map Icon" />
          </span>
        </a>
      </div>
      <div className="navbar-end nav-bar-end-buttons">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1">
            <span className="theme">{getTheme}</span>
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
            {Themes &&
              Object.values(user ? Themes : LandingThemes).map((theme) => (
                <li key={theme}>
                  <input
                    type="radio"
                    name="theme-dropdown"
                    className="theme-controller w-full btn btn-sm btn-block btn-ghost justify-start"
                    aria-label={theme}
                    value={theme}
                    onChange={handleThemeChange}
                  />
                </li>
              ))}
          </ul>
        </div>
        {user ? (
          <button onClick={handleLogout} className="btn btn-primary logout">
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary login-button"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
