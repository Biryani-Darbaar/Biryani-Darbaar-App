import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { IonContent, IonHeader, IonPage, IonToast } from "@ionic/react";
import { ChevronRight, Coins, Minus, Plus, Trash2 } from "lucide-react"; // Import icons
import "../assets/css/Order.css";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import cart from "../assets/icons/cart.png";
import CustomButton from "../components/Button";
import PromoCode from "../components/PromoCode";
import AddressAndSpecifications from "../components/AddressAndSpecifications";

const Order: React.FC = () => {
  const [orderValues, setOrderValues] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [addressPop, setAddressPop] = useState(false);
  const [addressToast, setAddressToast] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [total, setTotal] = useState(() => {
    const savedTotal = sessionStorage.getItem("total");
    return savedTotal ? parseFloat(savedTotal) : 0;
  }); // Initialize total from sessionStorage
  const userId = sessionStorage.getItem("sessionUserId");
  const history = useHistory();

  const fetchOrders = async () => {
    console.log(userId);

    const response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/getCart`,
      {
        userId: userId,
      }
    );
    setOrderValues(response.data);
    console.log(response.data);
    // console.log(process.env.REACT_APP_API_ENDPOINT);

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
    const response = axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/user/${userId}`
    );
    response.then((res) => {
      setUserData(res.data);
    });
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  useEffect(() => {
    sessionStorage.setItem("total", total.toString());
  }, [total]);

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
    let amount = Math.round(subtotal * (1 - promoDiscount));
    if (applyDiscount && userData.discount && amount >= 100) {
      amount = amount * (1 - userData.discount / 100);
    }
    const total = amount + deliveryCharge;
    return { subtotal, deliveryCharge, total };
  };

  const handleRemoveItem = async (cartId: string) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_ENDPOINT}/cart/${cartId}`,
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
  const handleRewardDiscount = async (
    reward: number,
    userId: string,
    dollar: number
  ) => {
    console.log(reward, userId, dollar);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/apply-reward`,
        {
          reward: reward,
          userId: userId,
          dollar: dollar,
        }
      );
      if (response.status === 200) {
        const newTotal = response.data.totalPrice;
        console.log("New total after applying reward:", newTotal);
        setTotal(newTotal);
        sessionStorage.setItem("total", newTotal.toString());
      } else {
        console.log("Error applying reward");
      }
    } catch (error) {
      console.error("Error applying reward:", error);
    }
  };
  // Destructure calculated totals for easier access
  const {
    subtotal,
    deliveryCharge,
    total: calculatedTotal,
  } = calculateTotals();

  useEffect(() => {
    setTotal(calculatedTotal);
  }, [calculatedTotal]);

  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Cart" />
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
              <div></div>
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
                {userData.discount &&
                  userData.discount > 0 &&
                  Number(subtotal.toFixed(2)) >= 100 && (
                    <h5 className="total-content">
                      Reward from mini game:
                      <span className="dyna-price">{userData.discount}%</span>
                      <input
                        type="checkbox"
                        checked={applyDiscount}
                        className="order-discount-checkbox"
                        onChange={() => setApplyDiscount(!applyDiscount)}
                      />
                    </h5>
                  )}

                {userData.reward &&
                  Number(subtotal.toFixed(2)) >= 100 &&
                  userData.reward > 10 && (
                    <h5
                      onClick={() =>
                        userId &&
                        handleRewardDiscount(userData.reward, userId, total)
                      }
                      className="total-content reward-content"
                    >
                      Apply Reward
                      <span className="dyna-price-reward">
                        {userData.reward}
                        <Coins size={28} color="#f1c40f" />
                      </span>
                    </h5>
                  )}
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
                    if (sessionStorage.getItem("addressData") !== null) {
                      console.log("Checkout clicked");
                      const url = `${import.meta.env.VITE_API_ENDPOINT
                        }/user/${sessionStorage.getItem("sessionUserId")}`;
                      console.log("URL:", url);
                      const user = await axios.get(url);
                      const OrderData = {
                        customerName: user.data.userName,
                        customerAddress: sessionStorage.getItem("addressData"),
                        customerPhone: user.data.phoneNumber,
                        orderDate: new Date().toISOString(),
                        orderStatus: "Order Recieved",
                        totalPrice: total,
                        orderItems: orderValues.map((order) => ({
                          ...order,
                          dishName: order.name,
                          quantity:
                            quantities[order.cartItemId] || order.quantity,
                        })),
                      };
                      console.log("Order Data:", OrderData);
                      history.push({
                        pathname: "/Checkout",
                        state: {
                          orderItems: OrderData,
                          discountChecked: applyDiscount, // Pass discountChecked flag
                        },
                      });
                    } else {
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
