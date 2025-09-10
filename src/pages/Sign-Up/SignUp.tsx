import React, { useEffect, useState } from "react";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { isDark } from "../../themes/theme-functions";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../../google/config";
import { setUser } from "../../store/global-store";
import { UserType } from "../../store/store-interfaces";
import loginMapDark from "../../assets/images/login-map-dark.png";
import loginMap from "../../assets/images/login-map.png";
import { ensureUserDocument } from "../../google/Fire-Store/database-calls";

const SignUp: React.FC = () => {
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
  const [emailInUseError, setEmailInUseError] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);

  const handleLoginRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/login");
  };

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
        console.log(error);
      });
  };

  const onSubmit = async () => {
    const [email, password] = getValues(["email", "password"]);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: getValues("firstName") });
      try {
        await sendEmailVerification(user);
        setShowConfirmEmail(true);
      } catch (error) {
        console.error("Verification email error:", error);
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "Email is already in use",
        });
        setEmailInUseError(true);
      }
    }
  };

  useEffect(() => {
    setIsDarkMode(isDark(getTheme));
  }, [getTheme]);
  return (
    <div className="sign-up-page">
      <div className="sign-up-form-container">
        <div className="sign-up-title">Create an Account</div>

        <div>
          {showConfirmEmail && (
            <div className="confirm-email">
              <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Check your email to verify your account!</span>
              </div>
            </div>
          )}
        </div>

        <form
          action=""
          className="sign-up-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {emailInUseError && (
            <div role="alert" className="alert alert-error">
              <span>Error! Email is already in use.</span>
            </div>
          )}
          <label className={errors.firstName ? "input input-error" : "input"}>
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>
            <input
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                maxLength: {
                  value: 25,
                  message: "First name must be at most 25 characters",
                },
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9\-]*$/,
                  message: "Only letters, numbers or dash",
                },
              })}
            />
            {errors.firstName && (
              <span className="error-message">
                {errors.firstName.message as string}
              </span>
            )}
          </label>
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
              autoComplete="email"
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
              type="text"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/,
                  message: "Needs capital letter and special symbol",
                },
              })}
            />
            {errors.password && (
              <span className="error-message">
                {errors.password.message as string}
              </span>
            )}
          </label>
          <div className="link-buttons">
            <a href="/forgot-password" className="forgot-password-link"></a>
            <a className="sign-up-link" onClick={handleLoginRedirect}>
              Already have an account? Log in
            </a>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
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
      <div className="sign-up-image-container">
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

export default SignUp;
