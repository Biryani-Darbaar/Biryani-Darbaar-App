import React from "react";
import {
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Bell, ShoppingCart, Tags, ChevronRight } from "lucide-react";
import { useHistory } from "react-router";
import "./../assets/css/Settings.css";

const Settings = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="menu-header" color="danger">
          <IonTitle className="justify text-center ">Settings</IonTitle>
          <IonButtons slot="start">
            <div className="icon-left">
              <Bell
                className="bell"
                size={24}
                onClick={() => history.push("/Profile")}
              />
              <ShoppingCart size={24} onClick={() => history.push("/Order")} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Account settings</strong>
            </IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/PasswordSecurity")}>
            <IonLabel>Password & Security</IonLabel>
            <ChevronRight color="#252525" />
          </IonItem>
          <IonItem>
            <IonLabel onClick={() => history.push("/AppVersion")}>
              Application version
            </IonLabel>
            <ChevronRight color="#252525" />
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel><kbd></kbd>
              <strong>General Information</strong>
            </IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/Languages")}>
            <IonLabel>Languages</IonLabel>
            <ChevronRight color="#252525" />
          </IonItem>
          <IonItem button onClick={() => history.push("/Notifications")}>
            <IonLabel>Notification settings</IonLabel>
            <ChevronRight color="#252525" />
          </IonItem>
          <IonItem button onClick={() => history.push("/DishDash")}>
            <IonLabel>Introducing DishDash</IonLabel>
            <ChevronRight color="#252525" />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
