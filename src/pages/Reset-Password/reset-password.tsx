import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  getAuth,
} from "firebase/auth";
import "./reset-password.scss";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<
    "pending" | "valid" | "success" | "error"
  >("pending");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [email, setEmail] = useState("");

  const hasRunRef = React.useRef(false);

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === "success" && countdown === 0) {
      navigate("/login");
    }
  }, [status, countdown, navigate]);

  useEffect(() => {
    // Prevent running the effect more than once in Strict Mode
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const verifyCode = async () => {
      const oobCode = searchParams.get("oobCode");
      const mode = searchParams.get("mode");
      const auth = getAuth();

      if (mode === "resetPassword" && oobCode) {
        try {
          // Verify the password reset code is valid
          const userEmail = await verifyPasswordResetCode(auth, oobCode);
          setEmail(userEmail);
          setStatus("valid");
        } catch (error: any) {
          console.error("Error verifying reset code:", error);
          setStatus("error");
          setError("Invalid or expired password reset link.");
        }
      } else {
        setStatus("error");
        setError("Invalid or expired password reset link.");
      }
    };

    verifyCode();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const oobCode = searchParams.get("oobCode");
      const auth = getAuth();

      if (oobCode) {
        await confirmPasswordReset(auth, oobCode, newPassword);
        setStatus("success");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError(error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      {status === "pending" && (
        <span className="loading loading-infinity loading-xl"></span>
      )}

      {status === "valid" && (
        <div className="reset-password-form">
          <h1 className="reset-password-header">Reset Your Password</h1>
          <p className="reset-password-subheader">
            Enter your new password for <strong>{email}</strong>
          </p>

          <form onSubmit={handleSubmit} className="form-group">
            {error && (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">New Password</legend>
                <input
                  className="input reset-password-input"
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </fieldset>
            </div>

            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Confirm Password</legend>
                <input
                  className="input reset-password-input"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={loading}
                  minLength={6}
                />
              </fieldset>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-button"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      )}

      {status === "success" && (
        <div className="verify-text-container">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={
                  { "--value": countdown, width: "5rem" } as React.CSSProperties
                }
                aria-live="polite"
                aria-label=""
              ></span>
            </span>
            sec
          </div>
          <div className="email-verify-text-container">
            <span className="verify-text text-secondary">
              PASSWORD RESET SUCCESSFUL!
            </span>
            <br />
            <span className="redirect-text">Redirecting to login...</span>
          </div>
        </div>
      )}

      {status === "error" && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
