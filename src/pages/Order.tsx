import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MinusCircle, PlusCircle } from "lucide-react"; // Import icons
import ExploreContainer from "../components/ExploreContainer";
import "../assets/css/Order.css";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import cart from "../assets/icons/cart.png";
import CustomButton from "../components/Button";

const Order: React.FC = () => {
  const [orderValues, setOrderValues] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const userId = sessionStorage.getItem("sessionUserId");
  const history = useHistory();

  const fetchOrders = async () => {
    const response = await axios.post(
      "https://biryani-darbar-server.vercel.app/getCart",
      {
        userId: userId,
      }
    );
    setOrderValues(response.data);
    console.log(response.data);
    
    // Initialize quantities for each item based on the response data
    const initialQuantities = response.data.reduce((acc: { [key: string]: number }, item: any) => {
      acc[item.id] = item.quantity || 1; // Default to 1 if quantity not provided
      return acc;
    }, {});
    setQuantities(initialQuantities);
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const updateQuantity = (orderId: string, change: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [orderId]: Math.max((prevQuantities[orderId] || 1) + change, 1),
    }));
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-fullscreen">
          {orderValues.length > 0 ? (
            <div className="ordder-counter">
            {orderValues.map((order) => (
              <div key={order.cartItemId} className="order">
                <img src={order.image} alt="biryani" />
                <div className="order-details">
                  <h3>{order.name}</h3>
                  <p>${order.price.toFixed(2)}</p>
                </div>
                <div className="quantity-counter">
                  <MinusCircle
                    onClick={() => updateQuantity(order.cartItemId, -1)}
                    className="quantity-icon"
                    />
                  <span>{quantities[order.cartItemId] || order.quantity}</span>
                  <PlusCircle
                    onClick={() => updateQuantity(order.cartItemId, 1)}
                    className="quantity-icon"
                    />
                </div>
              </div>
            ))}
            <div className="total">
                  
            </div>
            </div>
          ) : (
            <div className="cart-no-items">
              <div className="container">
                <div className="internal-container">
                  <img src={cart} alt="" />
                </div>
                <h2 className="empty">Your cart is empty!</h2>
                <p className="empty-para">
                  Looks like you haven't made your order yet.
                </p>
              </div>
              <div className="btn-container">
                <button
                  className="button"
                  onClick={() => history.push("/Menu")}
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Order;
