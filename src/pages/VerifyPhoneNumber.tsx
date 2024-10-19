import React, { useState, useRef } from "react";
import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
} from "@ionic/react";
import OtpPage from "./OtpPage";
import { Link } from "react-router-dom";
import "../assets/css/Verifcation.css"

const VerifyPhoneNumber: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Refs for IonInputs to manage focus
  const inputRefs = useRef<Array<HTMLIonInputElement | null>>([]);

  // Function to send verification code
  const sendVerificationCode = () => {
    console.log("Sending code to:", phoneNumber);
    setShowVerificationInput(true);
  };

  // Function to handle code input change
  const handleCodeChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const updatedCode = [...verificationCode];
      updatedCode[index] = value;
      setVerificationCode(updatedCode);

      // Automatically focus the next input box if not the last one
      if (value !== "" && index < verificationCode.length - 1) {
        inputRefs.current[index + 1]?.setFocus(); // Use setFocus for IonInput
      }
    }
  };

  // Function to verify the entered code
  const verifyCode = () => {
    

    // Add your verification logic here
  };

  return (
    <IonPage>
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
        <IonButton expand="block" color="danger" onClick={sendVerificationCode}>
          Send Verification Code
        </IonButton>

        {/* Verification code input as boxes */}
        {showVerificationInput && (
          <>
            <IonLabel className="mt-4">Enter Verification Code</IonLabel>

            <OtpPage numberOfDigits={4} />

            {/* Button to verify code */}
            <div className="start-btn">
              <Link to="/Home" className="start-text" onClick={verifyCode}>
                Verify Code
              </Link>
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
