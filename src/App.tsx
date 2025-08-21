import { Geolocation } from "@capacitor/geolocation";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
// import { FirebaseMessaging } from '@capacitor-firebase/messaging';
// import { LocalNotifications } from '@capacitor/local-notifications';

import Home from "./pages/Home";
// import HomePage from './pages/HomePage'
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Orders from "./pages/Orders";
import Splash from "./pages/Splash";
import "./assets/css/App.css";
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { BookOpenText, House, NotebookText, User } from "lucide-react";
import HomePage from "./pages/HomePage";
import { auth } from "./providers/auth/firebase";
// Import the auth instance
import { onAuthStateChanged } from "firebase/auth";
import Item from "./pages/Item";
import CheckoutPage from "./pages/Checkout";
import Settings from "./pages/Settings";
import Offers from "./pages/Offers";
import Personal from "./pages/Personal";
import Loading from "./components/Loading";
import usePushNotifications from "./providers/pushNotifications";
import Notifications from "./pages/Notifications";
import Languages from "./pages/Languages";
import DishDash from "./pages/DishDash";
import Privacy from "./pages/Privacy";
import TermsOfUse from "./pages/TermsOfUse";
// import axios from "axios";

setupIonicReact();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  usePushNotifications();

  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        const locationString = `Latitude: ${latitude}, Longitude: ${longitude}`;
        sessionStorage.setItem("addressData", locationString);
      })
      .catch((error) => {
        console.error("Error getting location", error);
      });
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setTimeout(() => {
        setLoading(false);
      }, 1500); // Ensure loading page is shown for at least 5 seconds
    });

    // const listenForMessages = () => {
    //   FirebaseMessaging.addListener('notificationReceived', async (message) => {
    //     console.log('Message received:', message);
    //     // Push the notification using LocalNotifications
    //     await LocalNotifications.schedule({
    //       notifications: [
    //         {
    //           title: message.notification.title || "No Title",
    //           body: message.notification.body,
    //           id: new Date().getTime(),
    //           schedule: { at: new Date(Date.now() + 1000) },
    //           sound: null,
    //           attachments: null,
    //           actionTypeId: "",
    //           extra: null,
    //         },
    //       ],
    //     });
    //   });
    // };

    // listenForMessages();

    return () => {
      unsubscribe(); // Cleanup subscription on unmount
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const noTabsRoutes = ['/Splash', '/HomePage', '/SignIn', '/SignUp'];
  const shouldShowTabs = !noTabsRoutes.includes(location.pathname);

  return (
    <IonApp>
      <div>HELLO</div>
      {/* {shouldShowTabs ? (
        <IonTabs>
          <IonRouterOutlet>
            <Switch>
              <Route exact path="/Home">
                {isAuthenticated ? <Home /> : <Redirect to="/HomePage" />}
              </Route>
              <Route exact path="/Menu">
                {isAuthenticated ? <Menu /> : <Redirect to="/HomePage" />}
              </Route>
              <Route exact path="/Item">
                {isAuthenticated ? <Item /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Notifications">
                {isAuthenticated ? <Notifications /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Languages">
                {isAuthenticated ? <Languages /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/DishDash">
                {isAuthenticated ? <DishDash /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Checkout">
                <CheckoutPage />
              </Route>
              <Route path="/Order">
                {isAuthenticated ? <Order /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Settings">
                {isAuthenticated ? <Settings /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Orders">
                {isAuthenticated ? <Orders /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Profile">
                {isAuthenticated ? <Profile /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Offer">
                {isAuthenticated ? <Offers /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/Personal">
                {isAuthenticated ? <Personal /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/privacy">
                {isAuthenticated ? <Privacy /> : <Redirect to="/HomePage" />}
              </Route>
              <Route path="/termsOfUse">
                {isAuthenticated ? <TermsOfUse /> : <Redirect to="/HomePage" />}
              </Route>
              <Redirect exact path="/" to="/HomePage" />
            </Switch>
          </IonRouterOutlet>

          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton
              tab="Home"
              href="/Home"
              className={`custom-tab-button ${activeTab === "Home" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Home")}
            >
              <House className="tab-icon" />
              <IonLabel
                className={`tab-label ${activeTab === "Home" ? "active-tab" : ""
                  }`}
              >
                Home
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Menu"
              href="/Menu"
              className={`custom-tab-button ${activeTab === "Menu" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Menu")}
            >
              <BookOpenText className="tab-icon" />
              <IonLabel
                className={`tab-label ${activeTab === "Menu" ? "active-tab" : ""
                  }`}
              >
                Menu
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Order"
              href="/Order"
              className={`custom-tab-button ${activeTab === "Order" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Order")}
            >
              <NotebookText className="tab-icon" />
              <IonLabel
                className={`tab-label ${activeTab === "Order" ? "active-tab" : ""
                  }`}
              >
                Order
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Profile"
              href="/Profile"
              className={`custom-tab-button ${activeTab === "Profile" ? "active" : ""
                }`}
              onClick={() => setActiveTab("Profile")}
            >
              <User className="tab-icon" />
              <IonLabel
                className={`tab-label ${activeTab === "Profile" ? "active-tab" : ""
                  }`}
              >
                Profile
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      ) : (
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/Splash" component={Splash} />
            <Route exact path="/HomePage">
              {isAuthenticated ? <Redirect to="/Home" /> : <HomePage />}
            </Route>
            <Route exact path="/SignIn">
              {isAuthenticated ? <Redirect to="/Home" /> : <SignIn />}
            </Route>
            <Route exact path="/SignUp">
              {isAuthenticated ? <Redirect to="/Home" /> : <SignUp />}
            </Route>
            <Redirect exact from="/" to="/HomePage" />
          </Switch>
        </IonRouterOutlet>
      )} */}
    </IonApp>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <IonReactRouter>
      <App />
    </IonReactRouter>
  );
};

export default AppWrapper;
