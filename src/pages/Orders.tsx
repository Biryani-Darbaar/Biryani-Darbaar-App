import React, { useEffect, useState } from "react";
import axios from "axios";
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { Bell, ShoppingCart } from "lucide-react";
import { useHistory } from "react-router";
import "../assets/css/Orders.css";

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
        `http://localhost:4200/ordersByUser/${userId}`
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
        <IonToolbar color="danger">
          <IonTitle className="justify text-center">Orders</IonTitle>
          <IonButtons slot="start">
            <div className="icon-left">
              <Bell className="bell" size={24} onClick={() => history.push("/Profile")} />
              <ShoppingCart size={24} onClick={() => history.push("/Order")} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    <IonContent fullscreen>
      <div>
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            {/* <h3>Order ID: {order.orderId}</h3> */}
            <p>Delivery Address: {order.customerAddress}</p>
            {/* <p>Customer Phone: {order.customerPhone}</p> */}
            {/* <p>Order Date: {order.orderDate}</p> */}
            <p>Order Status: {order.orderStatus}</p>
            <h4>Items:</h4>
            <ul>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <li key={item.dishId}>
                    {item.dishName} - {item.quantity} x ${item.price}
                  </li>
                ))}
            </ul>
            <p>Total Price: ${order.totalPrice}</p>
          </div>
        ))}
      </div>
    </IonContent>
    </IonPage>
  );
};

export default Orders;
