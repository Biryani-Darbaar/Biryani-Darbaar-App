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
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CardElement from "../components/Card";
import "../assets/css/Checkout.css";
// Load Stripe instance with your public key
const stripePromise = loadStripe(
  "pk_test_51QI9zGP1mrjxuTnQyyTUejvj7utgaGHnYp3BAB4VNGDmHkpqd5xCJmV3Q9QVpI3302xjpR8K8zWxIzIzI1GfBV1t00UAvTLEY7"
);

interface CheckoutProps {
  amount: number;
  Order: any[];
}

interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

const handleCardSubmit = (cardDetails: CardDetails) => {
  // Handle card details submission
  console.log("Card details submitted:", cardDetails);
};

const Checkout: React.FC<CheckoutProps> = ({ amount, Order }) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [toastState, setToastState] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const history = useHistory();
  console.log("Order mundaa:", Order);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setPaymentError(null); // Reset the error message on each payment attempt
    try {
      setLoading(true);

      // Create payment intent on backend
      const response = await axios.post(
        "https://api.darbaarkitchen.com/create-payment-intent",
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
        console.log("Micheal okadu");
      } else if (result.paymentIntent?.status === "succeeded") {
        console.log("Payment successful!");
        setToastState(true);
        // Proceed with order creation after successful payment
        const orderResponse = await axios.post(
          "https://api.darbaarkitchen.com/create-order",
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
      console.log("Micheal okadu kaadu iddaru");
      const userId = { userId: sessionStorage.getItem("sessionUserId") };
      const response = await axios.post("https://api.darbaarkitchen.com/orders", {
        ...Order,
        ...userId,
      });

      console.log("Order created:", {
        orderData: Order,
        userId: sessionStorage.getItem("sessionUserId"),
        orderStatus: "Pending",
      });

      if (response.status === 201) {
        console.log("Order created successfully");
        for (const item of ((Order as unknown) as { orderItems: any[] }).orderItems) {
          const cartItemId = item.cartItemId;
          console.log("Cart Item ID:", cartItemId);
          
          const response = await axios.delete(
            `https://api.darbaarkitchen.com/cart/${cartItemId}`
          );
          console.log("Cart Item deleted:", response);
        }

        history.push("/Orders");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="Ion-Toolbar-Checkout" color="danger">
          <h2>Checkout</h2>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ margin: "20px 0" }}>
          <CardElement onSubmit={handleCardSubmit} />
        </div>
        {/* jugaad for video */}
        <div className="check-btn-container">
          <IonButton
            color={"danger"}
            onClick={handlePayment}
            disabled={!stripe || loading}
            className="check-btn"
          >
            {loading ? "Processing..." : "Pay Now"}
          </IonButton>
        </div>
        {/* Loading Spinner */}
        <IonLoading
          isOpen={loading}
          message="Processing payment..."
          spinner="bubbles"
        />
        {paymentError && (
          <IonToast
            className="toast-checkout"
            isOpen={!toastState}
            message="Payment successful!"
            duration={2000}
            color="success"
            onDidDismiss={() => setToastState(false)}
            position="bottom"
            cssClass="custom-toast"
          />
        )}
      </IonContent>
    </IonPage>
  );
};

// Wrap Checkout with Elements provider
const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const { amount, order } = (history.location.state as {
    amount: number;
    orderItems: any[];
  }) || {
    amount: 100,
    orderItems: [],
    user: {}, // Ensure user is initialized
  };
  console.log("Amount:", amount);
  console.log("Order Items:", order);

  return (
    <Elements stripe={stripePromise}>
      <Checkout amount={amount} Order={order} />
    </Elements>
  );
};

export default CheckoutPage;
