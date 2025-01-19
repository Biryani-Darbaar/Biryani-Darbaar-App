// import { PushNotifications } from "@capacitor/push-notifications";
// import { LocalNotifications } from "@capacitor/local-notifications";
// import axios from "axios";

// export const setupPushNotifications = async () => {
//   // Request permissions
//   const permission = await PushNotifications.requestPermissions();
//   if (permission.receive === "granted") {
//     // Register device for push notifications
//     console.log("Kojja lanja condom lekunda denguthaa")
//     try {
//     await PushNotifications.register(); 
//     console.log("Kojja lanja kodakan lekunda denguth")
//     } catch (error) {
//     console.error("Error registering device:", error);
//   }
    
//   }

//   PushNotifications.addListener("registrationError", (error) => {
//     console.log("Error registering device:", error);
//    })

//   // Handle push notification events
//   PushNotifications.addListener("registration", async (token) => {
//     console.log("Registration event triggered");
//     console.log("Device Token:", token.value);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_ENDPOINT}/store-token`,
//         { token: token.value }
//       );
//       if (response.status === 200) {
//         console.log("Device registered successfully");
//       } else {
//         console.error("Failed to register device:", response.status, response.data);
//       }
//     } catch (error) {
//       console.error("Error registering device:", error);
//     }
//   });

//   PushNotifications.addListener(
//     "pushNotificationReceived",
//     async (notification) => {
//       await LocalNotifications.schedule({
//         notifications: [
//           {
//             title: notification.title || "Notification",
//             body: notification.body || "You have a new notification",
//             id: new Date().getTime(),
//             schedule: { at: new Date(Date.now() + 1000) },
//             actionTypeId: "",
//             extra: null,
//           },
//         ],
//       });
//     }
//   );

//   PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {
//     console.log("Push notification action performed", notification.actionId, notification.inputValue);
//   });
// };
