import { PushNotifications } from "@capacitor/push-notifications";
import { LocalNotifications } from "@capacitor/local-notifications";
import axios from "axios";

export const setupPushNotifications = async () => {
  // Request permissions
  const permission = await PushNotifications.requestPermissions();
  if (permission.receive === "granted") {
    // Register device for push notifications
    await PushNotifications.register();
  }

  // Handle push notification events
  PushNotifications.addListener("registration", async (token) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}`,
      token.value
    );
    if (response.status === 200) {
      console.log("Device registered successfully");
    }
    // Send this token to your backend
  });

  PushNotifications.addListener(
    "pushNotificationReceived",
    async (notification) => {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title || "Notification",
            body: notification.body || "You have a new notification",
            id: new Date().getTime(),
            schedule: { at: new Date(Date.now() + 1000) },

            actionTypeId: "",
            extra: null,
          },
        ],
      });
    }
  );
};
