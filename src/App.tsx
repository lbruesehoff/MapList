import React, { useState, useEffect, JSX } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/landing";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/Sign-Up/SignUp";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer/footer";
import Membership from "./pages/Membership/membership";
import VerifyEmail from "./pages/Verify-Email/VerifyEmail";
import Settings from "./pages/Settings/settings";
import ForgotPassword from "./pages/Forgot-Password/forgot-password";
import ResetPassword from "./pages/Reset-Password/reset-password";
import Contact from "./pages/Contact/contact";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./google/config";
import { setUser } from "./store/global-store";
import { MembershipLevels, UserType } from "./store/store-interfaces";
import ReportBug from "./pages/Report-Bug/report-bug";
const getCurrentUser = () => {
  const user = useSelector((state: any) => state.global.user);
  return user ? true : false;
};

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = getCurrentUser();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(getCurrentUser());
  const [loading, setLoading] = useState(true);

  // Used to keep user logged in on page refresh
  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // User is signed in and email is verified
        const userData: UserType = {
          id: user.uid,
          email: user.email ?? "",
          name: user.displayName ?? "",
          membership: MembershipLevels.Free,
        };
        dispatch(setUser(userData));
      } else {
        // User is signed out or email not verified
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // if (loading) {
  //   return (
  //     <div className="loading-screen text-success">
  //       <span className="loading loading-ring loading-xl"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/memberships"
          element={
            <ProtectedRoute>
              <Membership />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-bug"
          element={
            <ProtectedRoute>
              <ReportBug />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
