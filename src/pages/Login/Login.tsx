import React, { useEffect, useState } from "react";
import "./Login.scss"; // Assuming you have a CSS file for styling
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isDark } from "../../themes/theme-functions";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../../google/config";
import { UserType } from "../../store/store-interfaces";
import { clearStore, setUser } from "../../store/global-store";
import loginFlat from "../../assets/images/login-flat.png";
import { ensureUserDocument } from "../../google/Fire-Store/database-calls";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTheme = useSelector((state: any) => state.global.theme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);

  useEffect(() => {
    // Log out user when they visit landing page
    auth.signOut().then(() => {
      dispatch(clearStore());
      document.documentElement.setAttribute("data-theme", "light"); // Clear the Redux store
    });
  }, []);

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // Store user data in state management
        const userData: UserType = {
          id: user.uid,
          email: user.email ?? "",
          name: user.displayName ?? "",
        };
        dispatch(setUser(userData)); // Add to redux store
        ensureUserDocument(); // Add user to Firestore
        navigate("/home");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const signIn = () => {
    const email = getValues("email");
    const password = getValues("password");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user.emailVerified) {
          // Signed in
          const userData: UserType = {
            id: user.uid,
            email: user.email ?? "",
            name: user.displayName ?? "",
          };
          dispatch(setUser(userData)); // Add to redux store
          ensureUserDocument(); // Add user to Firestore
          navigate("/home");
        } else {
          setSignInError(true);
          setEmailVerified(false);
          auth.signOut();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setSignInError(true);
      });
  };

  const onSubmit = () => {
    signIn();
  };

  useEffect(() => {
    setIsDarkMode(isDark(getTheme));
  }, [getTheme]);

  function handleSignUpRedirect(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void {
    event.preventDefault();
    navigate("/sign-up");
  }

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-title">Welcome Back</div>
        <form
          action=""
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {signInError && (
            <div role="alert" className="alert alert-error">
              <span>
                {!emailVerified
                  ? "Error! Email not verified."
                  : " Error! Invalid email or password."}
              </span>
            </div>
          )}
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
            <a
              onClick={() => navigate("/forgot-password")}
              className="forgot-password-link"
            >
              Forgot Password?
            </a>
            <a href="" className="sign-up-link" onClick={handleSignUpRedirect}>
              Create an Account
            </a>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="login-with-google">
          <div className="divider">OR</div>
          <button
            onClick={googleSignIn}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
      <div className="login-image-container">
        <img
          src={loginFlat}
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
