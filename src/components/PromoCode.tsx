import React, { useState } from "react";
import axios from "axios";
import "./PromoCode.css";
import {
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  IonContent,
} from "@ionic/react";
import CustomButton from "./Button";

interface PromoCodeProps {
  onClose: () => void;
}

const PromoCode: React.FC<PromoCodeProps> = ({  onClose }) => {
  const [promoCode, setPromoCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      console.log("Promo code:", promoCode);
      const response = await axios.post(
        "http://localhost:4200/validate-promo",
        {
          promoCode,
        }
      );

      if (response.data.success) {
        sessionStorage.setItem("promoDiscount", response.data.finalDiscount);
        onClose();
      } else {
        setErrorMessage("Invalid promo code. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      <IonHeader  >
        <IonToolbar>
          <IonTitle>
            <div className="promo-heading">Promo Code</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="popup">
          <div className="popup-content">
            <h2>Enter Promo Code</h2>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
            />
            <CustomButton onClick={handleSubmit} className="popup">
              Submit
            </CustomButton>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <CustomButton colorType="secondary" onClick={onClose} className="popup">
              Close
            </CustomButton>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default PromoCode;
