// pages/Checkout.tsx
import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonToast,
} from "@ionic/react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Load Stripe instance with your public key
const stripePromise = loadStripe("pk_test_51QI9zGP1mrjxuTnQyyTUejvj7utgaGHnYp3BAB4VNGDmHkpqd5xCJmV3Q9QVpI3302xjpR8K8zWxIzIzI1GfBV1t00UAvTLEY7");
interface CheckoutProps {
  amount: number;
}

const Checkout: React.FC<CheckoutProps> = ({ amount }) => {
 // default amount in cents
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [toastState, setToastState] = useState(false);
  const history = useHistory();
  const handlePayment = async () => {
    if (!stripe || !elements) return;

    try {
      setLoading(true);

      // Create payment intent on backend
      const response = await axios.post("http://localhost:4200/create-payment-intent", {
        amount,
        currency: "aud",
      });

      setClientSecret(response.data.clientSecret);

      const result = await stripe.confirmCardPayment(response.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        console.error("Payment error:", result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment successful!");
        setToastState(true);
        // const response = await axios.post("http://localhost:4200/create-order", {
        //     amount,
        //     currency: "aud",
        //     });
        // console.log(response);

        history.push("/Order");
        
        
      }
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <h2>Checkout</h2>
        <div style={{ margin: "20px 0" }}>
          <CardElement />
        </div>
        <IonButton onClick={handlePayment} disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </IonButton>
        <IonToast
            isOpen={toastState}
            message="Payment successful!"
            duration={2000}
            onDidDismiss={() => console.log("Dismissed")}
            >
        </IonToast>
      </IonContent>
    </IonPage>
  );
};

// Wrap Checkout with Elements provider
const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const { amount } = (history.location.state as { amount: number }) || { amount: 0 };
  return (
    <Elements stripe={stripePromise}>
      <Checkout amount={amount} />
    </Elements>
  );
};
export default CheckoutPage;
