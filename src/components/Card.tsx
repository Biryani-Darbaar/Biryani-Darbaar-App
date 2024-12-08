import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import "./Card.css";

interface CardElementProps {
  onSubmit: (cardDetails: CardDetails) => void;
}

interface CardDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    zip: string;
}

const CardElement: React.FC<CardElementProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = () => {
    if (cardNumber && expiryDate && cvc && zip) {
      onSubmit({ cardNumber, expiryDate, cvc, zip });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <IonCard className="ioncard-payment">
      <IonCardContent>
        <IonItem>
          <IonLabel>Card Number</IonLabel>
          <input
            className="expiry-input"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
              setCardNumber(value);
            }}
          />
        </IonItem>

        <IonItem>
          <IonLabel>Expiry Date</IonLabel>
          <input
            className="expiry-input"
            type="text"
            placeholder="MM/YY"
            maxLength={5}
            value={expiryDate}
            onChange={(e) => {
              let value = e.target.value;
              if (value.length === 2 && !value.includes("/")) {
          value = value + "/";
              } else if (value.length === 2 && value.includes("/")) {
          value = value.slice(0, 2);
              } else if (value.length === 3 && value.includes("/")) {
          value = value.slice(0, 2) + "/" + value.slice(2);
              } else if (value.length > 5) {
          value = value.slice(0, 5);
              }
              setExpiryDate(value);
            }}
          />
        </IonItem>

        <IonItem>
          <IonLabel >CVC</IonLabel>
          <IonInput
            type="password"
            placeholder="123"
            maxlength={3}
            value={cvc}
            onIonChange={(e) => setCvc(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel >ZIP Code</IonLabel>
          <IonInput
            type="text"
            placeholder="12345"
            maxlength={5}
            value={zip}
            onIonChange={(e) => setZip(e.detail.value!)}
          />
        </IonItem>

      </IonCardContent>
    </IonCard>
  );
};

export default CardElement;
