import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";

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
    <IonCard>
      <IonCardContent>
        <IonItem>
                  <IonLabel >Card Number</IonLabel>
          <IonInput
            type="text"
            placeholder="1234 5678 9012 3456"
            maxlength={16}
            value={cardNumber}
            onIonChange={(e) => setCardNumber(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel >Expiry Date</IonLabel>
          <IonInput
            type="text"
            placeholder="MM/YY"
            maxlength={5}
            value={expiryDate}
            onIonChange={(e) => setExpiryDate(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">CVC</IonLabel>
          <IonInput
            type="password"
            placeholder="123"
            maxlength={4}
            value={cvc}
            onIonChange={(e) => setCvc(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">ZIP Code</IonLabel>
          <IonInput
            type="text"
            placeholder="12345"
            maxlength={5}
            value={zip}
            onIonChange={(e) => setZip(e.detail.value!)}
          />
        </IonItem>

        <IonButton expand="block" onClick={handleSubmit}>
          Submit Payment
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default CardElement;
