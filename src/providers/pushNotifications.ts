import { useEffect } from 'react';
import axios from 'axios';
import { LocalNotifications } from '@capacitor/local-notifications';

// Register the user for push notifications
interface PushyNotificationData {
  message: string;
  [key: string]: any;
}
interface Pushy {
  listen: () => void;
  register: (callback: (err: Error | null, deviceToken: string) => void) => void;
  toggleInAppBanner: (enabled: boolean) => void;
  setNotificationListener: (callback: (data: PushyNotificationData) => void) => void;
  setNotificationClickListener: (callback: (data: PushyNotificationData) => void) => void;
  clearBadge: () => void;
}
declare var Pushy: Pushy;

const usePushNotifications = () => {
  useEffect(() => {
    // Wait for Capacitor to load on the device
    document.addEventListener('deviceready', async function () {
      // Start the Pushy service
      Pushy.listen();

      // Register the device for push notifications
      Pushy.register(async function (err: Error | null, deviceToken: string) {
        // Handle registration errors
        if (err) {
          return alert(err.message);
        }

        // Display an alert with device token
        console.log("Token received:", deviceToken);

        // Send the token to your backend server via an HTTP POST request
        await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/store-token`, {
          token: deviceToken,
        });

        // Succeeded, optionally do something to alert the user
      });

      // Enable in-app notification banners (iOS 10+)
      Pushy.toggleInAppBanner(true);

      // Listen for push notifications
      Pushy.setNotificationListener(async function (data) {
        // Print notification payload data
        console.log('Received notification: ' + JSON.stringify(data));

        // Create a local notification
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "New Notification",
              body: data.message,
              id: Math.floor(Date.now() / 1000), // Ensure ID is within Java int range
              schedule: { at: new Date(Date.now() + 1000) },
              actionTypeId: "",
              extra: null
            }
          ]
        });

        // Clear iOS app badge number
        Pushy.clearBadge();
      });

      // Listen for notification click
      Pushy.setNotificationClickListener(async function (data) {
        // Print notification payload data
        console.log('Notification click: ' + JSON.stringify(data));

        // Create a local notification
        await LocalNotifications.schedule({
          notifications: [
            {
              title: "Notification Clicked",
              body: data.message,
              id: Math.floor(Date.now() / 1000), // Ensure ID is within Java int range
              schedule: { at: new Date(Date.now() + 1000) },
              actionTypeId: "",
              extra: null
            }
          ]
        });

        // Navigate the user to another page or 
        // execute other logic on notification click
      });
    });
  }, []);
};

export default usePushNotifications;