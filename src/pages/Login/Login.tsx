import React, { useEffect, useState } from "react";
import "./login.scss"; // Assuming you have a CSS file for styling
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Themes } from "../../themes/theme-types";
import { darkOrLight } from "../../themes/theme-functions";
import loginMapDark from "../../assets/images/login-map-dark.png";
import loginMap from "../../assets/images/login-map.png";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const getTheme = useSelector((state: any) => state.global.theme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onSubmit = () => {
    navigate("/home");
  };

  useEffect(() => {
    setIsDarkMode(darkOrLight(getTheme));
  }, [getTheme]);

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-title">Welcome Back</div>
        <form
          action=""
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={errors.email ? "input input-error" : "input"}>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="text"
              placeholder="Email"
              autoComplete="username"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="error-message">
                {errors.email.message as string}
              </span>
            )}
          </label>
          <label className={errors.password ? "input input-error" : "input"}>
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="error-message">
                {errors.password.message as string}
              </span>
            )}
          </label>
          <div className="link-buttons">
            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
            <a href="" className="sign-up-link">
              Create an Account
            </a>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      <div className="login-image-container">
        <img
          src={isDarkMode ? loginMapDark : loginMap}
          alt="Login Map"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  );
};

export default Login;
