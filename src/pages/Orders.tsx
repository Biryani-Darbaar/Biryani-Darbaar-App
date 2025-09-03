import React, { useEffect, useState } from "react";
import axios from "axios";
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Bell, ShoppingCart } from "lucide-react";
import { useHistory } from "react-router";
import "../assets/css/Orders.css";
import { Check, CheckCheck } from "lucide-react";
import Navbar from "../components/navigation/NavBar";

const Orders = () => {
  interface OrderItem {
    dishId: number;
    dishName: string;
    quantity: number;
    price: number;
  }

  interface Order {
    orderId: number;
    customerName: string;
    customerAddress: string;
    customerPhone: string;
    orderDate: string;
    orderStatus: string;
    orderItems: OrderItem[];
    totalPrice: number;
  }

  const [orders, setOrders] = useState<Order[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = sessionStorage.getItem("sessionUserId");
      if (userId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_ENDPOINT}/ordersByUser/${userId}`
          );
          const sortedOrders = response.data.sort(
            (a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
          setOrders(sortedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Orders" />
      </IonHeader>
      <IonContent fullscreen>
        <div>
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-card-inner">
                <div className="order-header">
                  <h4>Order ID: {order.orderId}</h4>
                  <p className="order-status">
                    {order.orderStatus === "Completed" ? (
                      <CheckCheck size={30} color="#318CE7" />
                    ) : (
                      <Check size={30} />
                    )}
                  </p>
                </div>
                <div className="order-details">
                  <p><strong>Order Status:</strong>{order.orderStatus}</p>
                  <p><strong>Delivery Address:</strong> {order.customerAddress}</p>
                  <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <li key={item.dishId}>
                          {item.dishName} - {item.quantity} x ${item.price}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="order-total">
                  <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
