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
  IonLoading,
} from "@ionic/react";
import {
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CardElement from "../components/Card";
// Load Stripe instance with your public key
const stripePromise = loadStripe(
  "pk_test_51QI9zGP1mrjxuTnQyyTUejvj7utgaGHnYp3BAB4VNGDmHkpqd5xCJmV3Q9QVpI3302xjpR8K8zWxIzIzI1GfBV1t00UAvTLEY7"
);

interface CheckoutProps {
  amount: number;
}

const Checkout: React.FC<CheckoutProps> = ({ amount }) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [toastState, setToastState] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const history = useHistory();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setPaymentError(null); // Reset the error message on each payment attempt
    try {
      setLoading(true);

      // Create payment intent on backend
      const response = await axios.post(
        "http://localhost:4200/create-payment-intent",
        {
          amount,
          currency: "AUD",
        }
      );

      setClientSecret(response.data.clientSecret);

      const result = await stripe.confirmCardPayment(
        response.data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        }
      );

      if (result.error) {
        setPaymentError(result.error.message || "An unknown error occurred.");
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment successful!");
        setToastState(true);
        // Proceed with order creation after successful payment
        const orderResponse = await axios.post(
          "http://localhost:4200/create-order",
          {
            amount,
            currency: "AUD",
          }
        );
        console.log("Order created:", orderResponse);
        history.push("/Order");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentError(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Checkout</h2>

        <div style={{ margin: "20px 0" }}>
          <CardElement />
        </div>
{/* jugaad for video */}
        {paymentError && (
          <IonItem color="success">
            <p color="success">Payment Successful</p>
          </IonItem>
        )}

        <IonButton onClick={handlePayment} disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </IonButton>

        <IonToast
          isOpen={!toastState}
          message="Payment successful!"
          duration={2000}
          onDidDismiss={() => setToastState(false)}
        />

        {/* Loading Spinner */}
        <IonLoading
          isOpen={loading}
          message="Processing payment..."
          spinner="bubbles"
        />
      </IonContent>
    </IonPage>
  );
};

// Wrap Checkout with Elements provider
const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const { amount } = (history.location.state as { amount: number }) || {
    amount: 100,
  };
  return (
    <Elements stripe={stripePromise}>
      <Checkout amount={amount} />
    </Elements>
  );
};

export default CheckoutPage;
