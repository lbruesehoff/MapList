import React from "react";
import "./landing.scss";
import locationLanding from "../../assets/images/location-landing.png";
import desktopMock from "../../assets/images/mn-trip.png";
import mobileMock from "../../assets/images/mn-trip-mobile.png";
import mobileMockList from "../../assets/images/mn-trip-mobile-list.png";
import lightDesktop from "../../assets/images/light-desktop.png";
import lightMobile from "../../assets/images/light-mobile-list.png";
import lightMobileMap from "../../assets/images/light-mobile-map.png";
import forestDesktop from "../../assets/images/forestDesktop.png";
import forestMapMobile from "../../assets/images/forestMapMobile.png";
import forestListMobile from "../../assets/images/forestListMobile.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const getTheme = useSelector((state: any) => state.global.theme);

  const navigateToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-text">
          <h1 className="landing-title">Organize locations in seconds!</h1>
          <p className="landing-description">
            A{" "}
            <span className="text-secondary landing-description-highlight">
              simple
            </span>{" "}
            way to organize and visualize your favorite places
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Create Map for Free
          </button>
        </div>
        <div className="landing-image">
          <img src={locationLanding} alt="Map visualization" />
        </div>
      </div>
      <div className="landing-sub-section">
        <div className="landing-sub-header-text">
          <span className="text-neutral">Simple.</span>{" "}
          <span className="text-secondary">Organized.</span>{" "}
          <span className="text-neutral">Visual.</span>
        </div>
        <div className="landing-sub-description">
          Organize locations the easy way with intuitive tools, seamless flow,
          and themes made for you.
        </div>
      </div>
      <div className="landing-mocks">
        <div className="mobile-mock">
          <img
            src={
              getTheme === "forest"
                ? forestListMobile
                : getTheme === "light"
                ? lightMobile
                : mobileMock
            }
            alt="Map visualization"
          />
          <img
            src={
              getTheme === "forest"
                ? forestMapMobile
                : getTheme === "light"
                ? lightMobileMap
                : mobileMockList
            }
            alt="Map visualization"
          />
        </div>
        <div className="desktop-mock">
          <img
            src={
              getTheme === "forest"
                ? forestDesktop
                : getTheme === "light"
                ? lightDesktop
                : desktopMock
            }
            alt="Map visualization"
          />
        </div>
      </div>
      <div className="landing-memberships" id="memberships">
        <div className="badge badge-xs badge-warning">
          Get the most out of your membership
        </div>

        <div className="membership-title">Membership Plans</div>
        <div className="membership-desc">
          Choose the plan that's
          <span className="text-secondary membership-highlight">
            {" "}
            right for you.
          </span>
        </div>
        <div className="membership-plans">
          <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
              <span className="badge badge-xs"></span>

              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Free</h2>
                <span className="text-xl">$0/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>2 Folders</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>5 Locations per folder</span>
                </li>

                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>3 themes</span>
                </li>
                <li className="opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-base-content/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="line-through">Download Maps</span>
                </li>
                <li className="opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-base-content/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="line-through">
                    Save Folders and Locations
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-neutral btn-block"
                  onClick={navigateToSignUp}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
          <div className="card w-96 bg-base-100 shadow-sm">
            <div className="card-body">
              <span className="badge badge-xs badge-warning">Most Popular</span>
              <div className="flex justify-between">
                <h2 className="text-3xl font-bold">Pro</h2>
                <span className="text-xl">$5/mo</span>
              </div>
              <ul className="mt-6 flex flex-col gap-2 text-xs">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited Folders</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited Locations</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>10+ themes to choose from</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Download Maps</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 me-2 inline-block text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save Folders and Locations</span>
                </li>
              </ul>
              <div className="mt-6">
                <button
                  className="btn btn-primary btn-block"
                  onClick={navigateToSignUp}
                >
                  Join Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
