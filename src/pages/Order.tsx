import { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react"; // Import icons
import ExploreContainer from "../components/ExploreContainer";
import "../assets/css/Order.css";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import cart from "../assets/icons/cart.png";
import CustomButton from "../components/Button";
import PromoCode from "../components/PromoCode";
import AddressAndSpecifications from "../components/AddressAndSpecifications";
import CheckoutPage from "./Checkout";

const Order: React.FC = () => {
  const [orderValues, setOrderValues] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [addressPop, setAddressPop] = useState(false);
  const [addressToast, setAddressToast] = useState(false);
  const userId = sessionStorage.getItem("sessionUserId");
  const history = useHistory();

  const fetchOrders = async () => {
    const response = await axios.post(
      "http://localhost:4200/getCart",
      {
        userId: userId,
      }
    );
    setOrderValues(response.data);
    console.log(response.data);

    // Initialize quantities for each item based on the response data
    const initialQuantities = response.data.reduce(
      (acc: { [key: string]: number }, item: any) => {
        acc[item.id] = item.quantity || 1; // Default to 1 if quantity not provided
        return acc;
      },
      {}
    );
    setQuantities(initialQuantities);
  };

  useEffect(() => {
    console.log(userId);
    
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

  const handlePromo = () => {
    console.log("Promo code applied");
    setShowPromoCode(true);
  };
  const handleAddressChange = () => {
    setAddressPop(true);
  };
  // Calculate subtotal, delivery charge, and total
  const calculateTotals = () => {
    const subtotal = orderValues.reduce((acc, order) => {
      return (
        acc + order.price * (quantities[order.cartItemId] || order.quantity)
      );
    }, 0);
    const deliveryCharge = 2;
    const promoDiscount = parseFloat(
      sessionStorage.getItem("promoDiscount") || "0"
    );
    const amount = Math.round(subtotal * (1 - promoDiscount));
    const total = amount + deliveryCharge;
    return { subtotal, deliveryCharge, total };
  };

  const handleRemoveItem = async (cartId: string) => {
    const response = await axios.delete(
      `http://localhost:4200/cart/${cartId}`,
      {
        data: {
          userId: userId,
        },
      }
    );
    if (response.status === 200) {
      console.log("Item removed");
      fetchOrders();
    } else {
      console.log("Error removing item");
    }
  };
  // Destructure calculated totals for easier access
  const { subtotal, deliveryCharge, total } = calculateTotals();

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <div className="content-fullscreen">
          {orderValues.length > 0 ? (
            <div className="order-counter">
              {orderValues.map((order) => (
                <div key={order.cartItemId} className="order">
                  <img src={order.image} alt="biryani" />
                  <div className="order-details">
                    <h3>{order.name}</h3>
                    <p>
                      $
                      {(
                        order.price *
                        (quantities[order.cartItemId] || order.quantity)
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div className="quantity-counter">
                    <Minus
                      onClick={() => updateQuantity(order.cartItemId, -1)}
                      className="quantity-icon"
                      fill="#fff"
                    />
                    <span>
                      {quantities[order.cartItemId] || order.quantity}
                    </span>
                    <Plus
                      onClick={() => updateQuantity(order.cartItemId, 1)}
                      className="quantity-icon"
                    />
                    <Trash2
                      size={20}
                      color="red"
                      onClick={() => {
                        handleRemoveItem(order.cartItemId);
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="apply-promo" onClick={handlePromo}>
                Apply promocode <ChevronRight />
              </div>
              {showPromoCode && (
                <PromoCode onClose={() => setShowPromoCode(false)} />
              )}
              <div className="total">
                <h5 className="total-content">
                  Subtotal:{" "}
                  <span className="dyna-price"> ${subtotal.toFixed(2)}</span>
                </h5>
                <h5 className="total-content">
                  Delivery:{" "}
                  <span className="dyna-price">
                    {" "}
                    ${deliveryCharge.toFixed(2)}
                  </span>
                </h5>
                <div className="line"></div>
                <h4 className="total-content">
                  Total:{" "}
                  {
                    <span className="dyna-price total-price">
                      {" "}
                      ${total.toFixed(2)}
                    </span>
                  }
                </h4>
              </div>
              {/* <PromoCode amount={total} onClose={() => console.log("Promo code closed")} /> */}
              <div className="">
                <CustomButton
                  className="checkout-button"
                  onClick={handleAddressChange}
                >
                  Add Address and Specifications
                </CustomButton>
                <CustomButton
                  className="checkout-button"
                  onClick={async () => {
                    if (sessionStorage.getItem("address") !== null) {
                      console.log("Checkout clicked");
                      const url = `http://localhost:4200/user/${sessionStorage.getItem("sessionUserId")}`;
                      console.log("URL:", url);
                      const user = await axios.get(url);
                        const OrderData = {
                        "customerName": user.data.userName,
                        "customerAddress": sessionStorage.getItem("address"),
                        "customerPhone": user.data.phoneNumber,
                        "orderDate": new Date().toISOString(),
                        orderStatus: "Pending",
                        "totalPrice": total,
                        "orderItems": orderValues.map((order) => ({
                          ...order,
                          dishName: order.name,
                          quantity: quantities[order.cartItemId] || order.quantity,
                        })),
                        }
                      console.log("Order Data:", OrderData);
                      history.push({
                        pathname: "/Checkout",
                        state: {
                          order: OrderData,
                          // Ensure user data is passed correctly
                        },
                      });
                    }
                    else{
                      setAddressToast(true);
                      setAddressPop(true);
                    }
                  }}
                >
                  Checkout
                </CustomButton>
                <IonToast
                  isOpen={addressToast}
                  onDidDismiss={() => setAddressToast(false)}
                  message="Please add address"
                  duration={2000}
                  color="danger"
                />
              </div>
              {addressPop && (
                <AddressAndSpecifications
                  onClose={() => setAddressPop(false)}
                />
              )}
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
                  className="menu-button"
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
