import React, { useState } from "react";
import forgot from "../../assets/images/forgot.png";
import "./forgot-password.scss";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.global.user);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-image">
        <img src={forgot} alt="Forgot Password Illustration" />
      </div>
      <h1 className="forgot-password-header">Forgot Your Password?</h1>
      <p className="forgot-password-subheader">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      {submitted ? (
        <div className="success-message">
          <p>
            If an account exists with that email, you will receive a password
            reset link shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">What is your name?</legend>
              <input
                className="input"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </fieldset>
          </div>

          <button type="submit" className="btn btn-primary submit-button">
            Send Reset Link
          </button>
        </form>
      )}

      {!user && (
        <div className="back-to-login">
          <a onClick={() => navigateTo("/login")}>Back to Login</a>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
