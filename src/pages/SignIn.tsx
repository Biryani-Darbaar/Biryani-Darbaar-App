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
  IonCheckbox,
  IonIcon,
  IonToast,
  IonRouterOutlet,
  IonCard,
} from "@ionic/react";
import {
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { Link, Route, useHistory } from "react-router-dom";
import SignUp from "./SignUp";
import VerifyPhoneNumber from "./VerifyPhoneNumber"; // Import the VerifyPhoneNumber page

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory(); // useHistory for navigation

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignIn = () => {
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

    // Simulate successful sign-in
    console.log("Sign in with:", email, password);

    // Navigate to VerifyPhoneNumber page after successful sign-in
    alert("")
    history.push("/VerifyPhoneNumber");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger"></IonToolbar>

        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/SignUp" component={SignUp} />
            <Route
              path="/VerifyPhoneNumber"
              component={VerifyPhoneNumber}
            />{" "}
            {/* Route for phone verification */}
          </IonRouterOutlet>
        </IonReactRouter>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        <IonItem className="mb-4">
          <IonIcon icon={mailOutline} slot="start" color="danger" />
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            placeholder="Email"
          />
        </IonItem>

        <IonItem className="mb-6">
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

        <div className="flex justify-between items-center mb-6">
          <IonItem lines="none">
            <IonCheckbox
              checked={rememberMe}
              onIonChange={(e) => setRememberMe(e.detail.checked)}
            />
            <IonLabel className="ml-2">Remember me</IonLabel>
          </IonItem>
          <IonButton fill="clear" color="danger" size="small">
            Forgot password?
          </IonButton>
        </div>

        <IonButton expand="block" color="danger" onClick={handleSignIn}>
          Sign in
        </IonButton>

        <p className="text-center mt-6">
          <span className="text-gray-500">Don't have an account? </span>
          <IonButton fill="clear" color="danger" size="small">
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/SignUp" component={SignUp} />
              </IonRouterOutlet>
            </IonReactRouter>
         
          </IonButton>
          <Link to="/SignUp">Sign up</Link>
        </p>

        <div className="flex justify-center space-x-4 py-4">
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={logoFacebook} />
          </IonButton>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={logoGoogle} />
          </IonButton>
        </div>

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

export default SignIn;
