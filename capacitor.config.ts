import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.biryani.app",
  appName: "foodhut",
  webDir: "dist",
  server: {
    url: "http://192.168.1.7:5173/",
  },
  plugins: {
    FirebaseMessaging: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Firebase: {
      apiKey:  "AIzaSyD0iODZIMyuOJ19pVp6HHOflV1IzPq7goI",
      authDomain: "biryani-darbar-770a5.firebaseapp.com",
      projectId: "biryani-darbar-770a5",
      storageBucket:"biryani-darbar-770a5.appspot.com",
      messagingSenderId: "90536512568",
      appId: "1:90536512568:android:8039086487507852f1aacd",
      measurementId: "G-869Y2HDKNN"
    }
  },
};

export default config;
