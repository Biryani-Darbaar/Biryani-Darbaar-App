import React, { useState } from "react";
import { IonPage, IonIcon, IonToast } from "@ionic/react";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  checkmarkOutline,
} from "ionicons/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navigation/NavBar";

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName) {
      setErrorMessage("Please enter both first and last names.");
      setShowErrorToast(true);
      return;
    }

    if (!phNumber || phNumber.length < 10) {
      setErrorMessage("Please enter a valid phone number.");
      setShowErrorToast(true);
      return;
    }

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

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setShowErrorToast(true);
      return;
    }

    const fullName = `${firstName}${lastName}`;
    const payload = {
      userName: fullName,
      email: email,
      password: password,
      phoneNumber: phNumber,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/auth/signup`,
      payload,
    );

    if (response.status === 201) {
      history.push("/SignIn");
      return;
    }
    setErrorMessage("An error occurred. Please try again.");
    setShowErrorToast(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar publicNav={true} />
      <div className="flex flex-col h-full justify-center items-center px-6">
        <div className="bg-white w-full flex flex-col items-center rounded-lg py-8 px-6 gap-6">
          <span className="text-3xl font-bold text-titleColor w-full text-left">
            Create an Account
          </span>
          <p className="text-textColor w-full text-left">
            Sign up to get started
          </p>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="given-name"
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="family-name"
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <input
                type="tel"
                value={phNumber}
                onChange={(e) => setPhNumber(e.target.value)}
                placeholder="Phone Number"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <IonIcon
                icon={mailOutline}
                className="text-primary text-xl mr-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="email"
              />
              {isValidEmail(email) && (
                <IonIcon
                  icon={checkmarkOutline}
                  className="text-primary text-xl ml-2"
                />
              )}
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <IonIcon
                icon={lockClosedOutline}
                className="text-primary text-xl mr-2"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="new-password"
              />
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                className="text-neutral-400 text-xl ml-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="w-full relative">
            <div className="flex items-center border rounded-lg border-primary/20 focus-within:border-primary p-3">
              <IonIcon
                icon={lockClosedOutline}
                className="text-primary text-xl mr-2"
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="bg-transparent outline-none flex-1 text-neutral-900 text-base font-semibold"
                autoComplete="new-password"
              />
              <IonIcon
                icon={showConfirmPassword ? eyeOffOutline : eyeOutline}
                className="text-neutral-400 text-xl ml-2 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
          </div>
          <button
            className="w-full bg-primary text-white rounded-lg py-3 font-semibold text-lg shadow-none hover:bg-primary/90 transition"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          <div className="w-full text-center">
            <span className="text-textColor text-sm">
              Already have an account?{" "}
            </span>
            <Link
              to="/SignIn"
              className="text-primary text-sm font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <IonToast
        isOpen={showErrorToast}
        onDidDismiss={() => setShowErrorToast(false)}
        message={errorMessage}
        duration={2000}
        className="font-sans"
        color="danger"
      />
    </IonPage>
  );
};

export default SignUp;
