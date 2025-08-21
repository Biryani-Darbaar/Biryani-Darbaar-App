import React, { useState, useRef } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonToolbar,
  IonRouterOutlet,
  useIonRouter
} from "@ionic/react";
import OtpPage from "./OtpPage";
import { Route } from "react-router-dom";
import "../assets/css/Verification.css";
import HomePage from "./HomePage";
import { sendVerificationCode } from "../providers/auth/firebase";

const VerifyPhoneNumber: React.FC = () => {
  const router = useIonRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);

  // Refs for IonInputs to manage focus
  const inputRefs = useRef<Array<HTMLIonInputElement | null>>([]);

  // Function to send verification code
  const sendVerificationCodeHandler = async () => {
    try {
      const confirmationResult = await sendVerificationCode(phoneNumber);
      setVerificationId(confirmationResult.verificationId);
      setShowVerificationInput(true);
    } catch (error) {
      setErrorMessage("Failed to send verification code. Please try again.");
    }
  };

  // Function to handle successful verification
  const handleSuccess = () => {
    setSuccessMessage("Phone number verified successfully!");
    router.push('/HomePage');
  };

  // Function to handle verification error
  const handleError = (error: string) => {
    setErrorMessage(error);
  };

  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/HomePage" component={HomePage} />
        {/* Route for phone verification */}
      </IonRouterOutlet>

      <IonToolbar color="danger"></IonToolbar>
      <IonContent className="ion-padding">
        <h1 className="text-2xl font-bold mb-4">Phone Verification</h1>

        {/* Phone number input */}
        <IonItem>
          <IonInput
            type="tel"
            value={phoneNumber}
            onIonChange={(e) => setPhoneNumber(e.detail.value!)}
            placeholder="Phone Number"
          />
        </IonItem>

        {/* Button to send verification code */}
        <IonButton expand="block" color="danger" onClick={sendVerificationCodeHandler}>
          Send Verification Code
        </IonButton>

        {/* Verification code input as boxes */}
        {showVerificationInput && (
          <>
            <IonLabel className="mt-4">Enter Verification Code</IonLabel>

            <OtpPage
              numberOfDigits={4}
              verificationId={verificationId}
              onSuccess={handleSuccess}
              onError={handleError}
            />

            {/* Button to verify code */}
            <div className="start-btn" onClick={handleSuccess}>
              verify Code
            </div>
          </>
        )}

        {/* Toasts for error/success messages */}
        <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage("")}
          message={errorMessage}
          duration={3000}
          color="danger"
        />
        <IonToast
          isOpen={!!successMessage}
          onDidDismiss={() => setSuccessMessage("")}
          message={successMessage}
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default VerifyPhoneNumber;
