import React, { useState } from "react";
import {
  IonPage,
  IonIcon,
  IonToast,
} from "@ionic/react";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logoFacebook,
  logoGoogle,
  checkmarkOutline,
} from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from "axios";
import Navbar from "../components/navigation/NavBar";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !isValidEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setShowErrorToast(true);
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      setShowErrorToast(true);
      return;
    }

    const auth = getAuth();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const accessToken = await res.user.getIdToken();
      const endres = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
        idToken: accessToken
      });
      const { sessionId, sessionUserId } = endres.data;
      sessionStorage.setItem("sessionId", sessionId);
      sessionStorage.setItem("sessionUserId", sessionUserId);
      history.push("/Home");
    } catch (error) {
      setErrorMessage((error as Error).message);
      setShowErrorToast(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar publicNav={true} />
      <div className="flex flex-col h-full justify-center items-center px-6">
        {/* Centered card */}
        <div className="bg-white w-full flex flex-col items-center rounded-lg py-8 px-6 gap-6">
          <span className="text-3xl font-bold text-titleColor w-full text-left">Welcome Back!</span>
          <p className="text-textColor w-full text-left">Sign in to continue</p>

          {/* Email input */}
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <IonIcon icon={mailOutline} className="text-primary text-xl mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="fahad@1234567809"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="email"
              />
              {isValidEmail(email) && (
                <IonIcon icon={checkmarkOutline} className="text-primary text-xl ml-2" />
              )}
            </div>
          </div>

          {/* Password input */}
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <IonIcon icon={lockClosedOutline} className="text-primary text-xl mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="current-password"
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className="text-neutral-400 text-xl ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between w-full">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox accent-primary w-4 h-4 rounded"
              />
              <span className="text-textColor text-sm">Remember me</span>
            </label>
            <button
              type="button"
              className="text-primary text-sm font-medium hover:underline focus:outline-none"
              onClick={() => {/* handle forgot password */ }}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In button */}
          <button
            className="w-full bg-primary text-white rounded-lg py-3 font-semibold text-lg shadow-none hover:bg-primary/90 transition"
            onClick={handleSignIn}
          >
            Sign In
          </button>

          {/* Sign up link */}
          <div className="w-full text-center">
            <span className="text-textColor text-sm">Don't have an account? </span>
            <Link to="/SignUp" className="text-primary text-sm font-semibold hover:underline">
              Sign up.
            </Link>
          </div>
        </div>


        <div className="flex justify-center gap-4 mt-6 w-full px-6">
          <div className="flex-1 flex items-center justify-center rounded-lg py-3 border hover:bg-neutral-50 transition">
            <IonIcon icon={logoFacebook} className="text-blue-600 text-2xl" />
          </div>
          <div className="flex-1 flex items-center justify-center rounded-lg py-3 border hover:bg-neutral-50 transition">
            <IonIcon icon={logoGoogle} className="text-red-500 text-2xl" />
          </div>
        </div>
      </div>

      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        message={errorMessage}
        duration={1000}
        className="font-sans"
        color="danger"
      />
    </IonPage>
  );
};

export default SignIn;
