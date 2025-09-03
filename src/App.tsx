import { Geolocation } from "@capacitor/geolocation";
import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";
import { LocalNotifications } from "@capacitor/local-notifications";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./providers/auth/firebase";
import usePushNotifications from "./providers/pushNotifications";
import TabBar from "./components/navigation/TabBar";
import Loading from "./components/Loading";
import PrivateRoute from "./lib/PrivateRoute";
import { routes } from "./constants/Global";

import "./global.css";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const location = useLocation();

  usePushNotifications();

  // Handle splash + onboarding
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 1000);

    const onboarding = localStorage.getItem("onboardingComplete");
    if (onboarding) setOnboardingComplete(true);

    // 👇 listen for onboardingComplete event
    const handleOnboardingComplete = () => setOnboardingComplete(true);
    window.addEventListener("onboardingComplete", handleOnboardingComplete);

    return () => {
      window.removeEventListener("onboardingComplete", handleOnboardingComplete);
    };
  }, []);

  // Handle auth + geolocation
  useEffect(() => {
    Geolocation.getCurrentPosition()
      .then((pos) => {
        const { latitude, longitude } = pos.coords;
        sessionStorage.setItem("addressData", `Lat:${latitude}, Lng:${longitude}`);
      })
      .catch((err) => console.error("Location error:", err));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setTimeout(() => setLoading(false), 1500);
    });

    FirebaseMessaging.addListener("notificationReceived", async (msg) => {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: msg.notification.title || "No Title",
            body: msg.notification.body || "",
            id: Date.now(),
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });
    });

    return () => unsubscribe();
  }, []);

  if (loading || showSplash) return <Loading />;

  // If onboarding not complete → force show onboarding
  if (!onboardingComplete && location.pathname !== "/Onboarding") {
    return <Redirect to="/Onboarding" />;
  }

  const noTabsRoutes = ["/Splash", "/Onboarding", "/SignIn", "/SignUp"];
  const shouldShowTabs = !noTabsRoutes.includes(location.pathname);

  return (
    <IonApp>
      <div className="ion-page bg-slate-100">
        {shouldShowTabs ? (
          <IonTabs>
            <IonRouterOutlet>
              <Switch>
                {routes.map(({ path, exact, component, auth }, idx) =>
                  auth ? (
                    <PrivateRoute
                      key={idx}
                      path={path}
                      exact={exact}
                      component={component}
                      isAuthenticated={isAuthenticated}
                    />
                  ) : (
                    <Route
                      key={idx}
                      path={path}
                      exact={exact}
                      component={component}
                    />
                  )
                )}
                <Redirect exact from="/" to={isAuthenticated ? "/Home" : "/SignIn"} />
              </Switch>
            </IonRouterOutlet>
            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          </IonTabs>
        ) : (
          <IonRouterOutlet>
            <Switch>
              {routes.map(({ path, exact, component, auth }, idx) =>
                auth ? (
                  <PrivateRoute
                    key={idx}
                    path={path}
                    exact={exact}
                    component={component}
                    isAuthenticated={isAuthenticated}
                  />
                ) : (
                  <Route
                    key={idx}
                    path={path}
                    exact={exact}
                    component={component}
                  />
                )
              )}
              <Redirect exact from="/" to={isAuthenticated ? "/Home" : "/SignIn"} />
            </Switch>
          </IonRouterOutlet>
        )}
      </div>
    </IonApp>
  );
};

const AppWrapper: React.FC = () => (
  <IonReactRouter>
    <App />
  </IonReactRouter>
);

export default AppWrapper;
