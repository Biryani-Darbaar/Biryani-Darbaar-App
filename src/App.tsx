import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
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

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyPhoneNumber from "./pages/VerifyPhoneNumber";
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

setupIonicReact();

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
          <Route exact path="/Splash">
            <Splash />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Menu">
            <Menu />
          </Route>
          <Route path="/Order">
            <Order />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/VerifyPhoneNumber">
            <VerifyPhoneNumber />
          </Route>
        </IonRouterOutlet>
          <IonTabBar slot="bottom" className="custom-tab-bar">
            <IonTabButton
              tab="Home"
              href="/Home"
              className={`custom-tab-button ${activeTab === "Home" ? "active" : ""}`}
              onClick={() => handleTabChange("Home")}
            >
              <House className="tab-icon" />
              <IonLabel className={`tab-label ${activeTab === "Home" ? "active-tab" : ""}`}>
                Home page
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Menu"
              href="/Menu"
              className={`custom-tab-button ${activeTab === "Menu" ? "active" : ""}`}
              onClick={() => handleTabChange("Menu")}
            >
              <BookOpenText className="tab-icon" />
              <IonLabel className={`tab-label ${activeTab === "Menu" ? "active-tab" : ""}`}>
                Menu
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Order"
              href="/Order"
              className={`custom-tab-button ${activeTab === "Order" ? "active" : ""}`}
              onClick={() => handleTabChange("Order")}
            >
              <NotebookText className="tab-icon" />
              <IonLabel className={`tab-label ${activeTab === "Order" ? "active-tab" : ""}`}>
                Order
              </IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="Profile"
              href="/Profile"
              className={`custom-tab-button ${activeTab === "Profile" ? "active" : ""}`}
              onClick={() => handleTabChange("Profile")}
            >
              <User className="tab-icon" />
              <IonLabel className={`tab-label ${activeTab === "Profile" ? "active-tab" : ""}`}>
                Profile
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
