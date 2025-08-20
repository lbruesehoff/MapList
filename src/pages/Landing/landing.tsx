import React from "react";
import "./landing.scss";
import locationLanding from "../../assets/images/location-landing.png";
import { useNavigate } from "react-router";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-text">
          <h1 className="landing-title">Organize locations in seconds!</h1>
          <p className="landing-description">
            A simple way to organize and visualize your favorite places
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
          {/* <div className="mockup-browser border border-base-300 w-full">
          <div className="mockup-browser-toolbar">
            <div className="input">https://daisyui.com</div>
          </div>
          <div className="grid place-content-center h-80">
            <img src={mnTrip} alt="Map visualization" />
          </div>
        </div>
        <div className="mockup-phone border-primary">
          <div className="mockup-phone-camera"></div>
          <div className="mockup-phone-display">
            <img alt="wallpaper" src="" />
          </div>
        </div> */}
        </div>
      </div>
      <div className="landing-sub-section">
        <div className="landing-sub-header-text">
          Simple. Organized. Visual.
        </div>
        <div className="landing-sub-description">
          Organize locations the easy way with intuitive tools, seamless flow,
          and themes made for you.
        </div>
      </div>
    </div>
  );
};

export default Landing;
