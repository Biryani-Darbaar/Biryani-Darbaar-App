import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonLoading,
  IonHeader,
  IonToolbar,
  IonToast,
} from "@ionic/react";
import { useStripe, useElements, Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../assets/css/Checkout.css";
import { MoveLeft } from "lucide-react";
// Load Stripe instance with your public key
const stripePromise = loadStripe(
  "pk_test_51QI9zGP1mrjxuTnQyyTUejvj7utgaGHnYp3BAB4VNGDmHkpqd5xCJmV3Q9QVpI3302xjpR8K8zWxIzIzI1GfBV1t00UAvTLEY7"
);

interface CheckoutProps {
  amount: number;
  Order: any[];
}

const Checkout: React.FC<CheckoutProps> = ({ amount, Order }) => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [toastState, setToastState] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const history = useHistory();
  console.log("Order:", Order);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setPaymentError(null); // Reset the error message on each payment attempt
    try {
      setLoading(true);

      // Create payment intent on backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/create-payment-intent`,
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
          `${import.meta.env.VITE_API_ENDPOINT}/create-order`,
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
      const userId = { userId: sessionStorage.getItem("sessionUserId") };
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/orders`,
        {
          ...Order,
          ...userId,
        }
      );

      console.log("Order created:", {
        orderData: Order,
        userId: sessionStorage.getItem("sessionUserId"),
        orderStatus: "Pending",
      });

      if (response.status === 201) {
        console.log("Order created successfully");
        for (const item of Order) {
          const cartItemId = item.cartItemId;
          console.log("Cart Item ID:", cartItemId);

          const response = await axios.delete(
            `${import.meta.env.VITE_API_ENDPOINT}/cart/${cartItemId}`
          );
          console.log("Cart Item deleted:", response);
        }

        if ((history.location.state as { discountChecked: boolean }).discountChecked) {
          const userId = sessionStorage.getItem("sessionUserId");
          await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/user/${userId}`, {
            discount: 0,
          });
        }
        sessionStorage.removeItem("total");

        history.push("/Orders");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleGoback(): void {
    history.goBack();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <div>
            <h2>
              <MoveLeft onClick={handleGoback} style={{ marginRight: "30%" }} />
              Checkout
            </h2>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ margin: "20px 0" }}>
          <CardElement />
        </div>
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
        <IonLoading
          isOpen={loading}
          message="Processing payment..."
          spinner="bubbles"
        />
        {paymentError && (
          <IonToast
            className="toast-checkout"
            isOpen={!toastState}
            message={paymentError}
            duration={2000}
            color="danger"
            onDidDismiss={() => setToastState(false)}
            position="bottom"
            cssClass="custom-toast"
          />
        )}
        <IonToast
          className="toast-checkout"
          isOpen={toastState}
          message="Payment successful!"
          duration={2000}
          color="success"
          onDidDismiss={() => setToastState(false)}
          position="bottom"
          cssClass="custom-toast"
        />
      </IonContent>
    </IonPage>
  );
};

// Wrap Checkout with Elements provider
const CheckoutPage: React.FC = () => {
  const history = useHistory();
  const { amount, orderItems } = (history.location.state as {
    amount: number;
    orderItems: any[];
  }) || {
    amount: 100,
    orderItems: [],
  };
  console.log("Amount:", amount);
  console.log("Order Items:", orderItems);

  return (
    <Elements stripe={stripePromise}>
      <Checkout amount={amount} Order={orderItems} />
    </Elements>
  );
};

export default CheckoutPage;
