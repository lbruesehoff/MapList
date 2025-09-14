import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode, getAuth } from "firebase/auth";
import "./VerifyEmail.scss";

const VerifyEmail: React.FC = () => {
  const [countdown, setCountdown] = useState(5);
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "success" && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [status, countdown]);

  const hasRunRef = React.useRef(false);

  useEffect(() => {
    // Prevent running the effect more than once in Strict Mode
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const verifyEmail = async () => {
      const oobCode = searchParams.get("oobCode");
      const mode = searchParams.get("mode");
      const auth = getAuth();

      if (mode === "verifyEmail" && oobCode) {
        try {
          const data = await applyActionCode(auth, oobCode);

          setStatus("success");
          setTimeout(() => navigate("/home"), 5000);
        } catch (error) {
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="verify-email-container">
      {status === "success" && (
        <div className="verify-text-container">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={
                  { "--value": countdown, width: "5rem" } as React.CSSProperties
                }
                aria-live="polite"
                aria-label={""}
              ></span>
            </span>
            sec
          </div>
          <div className="email-verify-text-container">
            <span className="verify-text text-secondary">EMAIL VERIFIED! </span>
            <br />
            <span className="redirect-text">Redirecting to maps...</span>
          </div>
        </div>
      )}
      {status === "pending" && (
        <span className="loading loading-infinity loading-xl"></span>
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
          <span>Invalid or expired verification link.</span>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
