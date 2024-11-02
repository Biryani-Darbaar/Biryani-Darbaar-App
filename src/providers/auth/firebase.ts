import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0iODZIMyuOJ19pVp6HHOflV1IzPq7goI",
  authDomain: "biryani-darbar-770a5.firebaseapp.com",
  projectId: "biryani-darbar-770a5",
  storageBucket: "biryani-darbar-770a5.appspot.com",
  messagingSenderId: "90536512568",
  appId: "1:90536512568:web:654acbb0e3efcfcaf1aacd",
  measurementId: "G-869Y2HDKNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };