import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonToast,
  IonRouterOutlet,
} from "@ionic/react";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from "ionicons/icons";
import "../assets/css/Signup.css";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
  // Validate email format
  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle sign-up action
  const handleSignUp = async () => {
    if (!firstName || !lastName) {
      setErrorMessage("Please enter both first and last names.");
      setShowErrorToast(true);
      return;
    }
    
    if(!phNumber || phNumber.length < 10){
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
      "userName": fullName,
      "email": email,
      "password": password,
      "phoneNumber": phNumber
    }
    console.log("Payload", payload);
    
    // Implement sign-up logic
    const response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/signup`, payload);

    if(response.status === 201){
      history.push("/SignIn");
      return;
    }
    setErrorMessage("An error occurred. Please try again.");
    setShowErrorToast(true);
    
    console.log("Sign up with:", firstName, lastName, email, password, phNumber, fullName, response);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger"></IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
        <p className="text-gray-500 mb-6">Sign up to get started</p>

        <IonItem className="mb-4">
          <IonInput
            type="text"
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
            placeholder="First Name"
          />
        </IonItem>

        <IonItem className="mb-4">
          <IonInput
            type="text"
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
            placeholder="Last Name"
          />
        </IonItem>
        <IonItem className="mb-4">
          <IonInput
            value={phNumber}
            onIonChange={(e) => setPhNumber(e.detail.value!)}
            placeholder="Phone Number"
          />
        </IonItem>
        <IonItem className="mb-4">
          <IonIcon icon={mailOutline} slot="start" color="danger" />
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            placeholder="Email"
          />
        </IonItem>

        <IonItem className="mb-4">
          <IonIcon icon={lockClosedOutline} slot="start" color="danger" />
          <IonInput
            type={showPassword ? "text" : "password"}
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            placeholder="Password"
          />
          <IonIcon
            icon={showPassword ? eyeOffOutline : eyeOutline}
            slot="end"
            color="medium"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        </IonItem>

        <IonItem className="mb-6">
          <IonIcon icon={lockClosedOutline} slot="start" color="danger" />
          <IonInput
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            placeholder="Confirm Password"
          />
          <IonIcon
            icon={showConfirmPassword ? eyeOffOutline : eyeOutline}
            slot="end"
            color="medium"
            onClick={toggleConfirmPasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        </IonItem>

        <IonButton expand="block" color="danger" onClick={handleSignUp}>
          Sign up
        </IonButton>

        <p className="text-center mt-6">
          <span className="text-gray-500">Already have an account? </span>
          <IonButton fill="clear" color="danger" size="small">
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/SignIn" component={SignIn} />
              </IonRouterOutlet>
            </IonReactRouter>
          </IonButton>
          <Link to="/SignIn">Sign In</Link>
        </p>

        {/* Toast for error messages */}
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message={errorMessage}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
