import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import "../assets/css/Notifications.css";
import axios from "axios";

interface NotificationData {
  notificationId: string;
  title: string;
  body: string;
  timestamp: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/notifications`)
      .then(response => setNotifications(response.data))
      .catch(error => console.error('Error fetching notifications:', error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Notifications" />
      </IonHeader>
      <IonContent>
        <div className="notifications-container">
          {notifications.map((notification) => (
            <div key={notification.notificationId} className="notification-card">
              <h3 className="notification-title">{notification.title}</h3>
              <p className="notification-body">{notification.body}</p>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
