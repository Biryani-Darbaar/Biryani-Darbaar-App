import React from 'react';
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
            <IonLabel><strong>Account settings</strong></IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push("/PasswordSecurity")}>
            <IonLabel>Password & Security</IonLabel>
            <ChevronRight color="#252525"/>
          </IonItem>
          <IonItem>
            <IonLabel>Application version</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel><strong>General Information</strong></IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Languages</IonLabel>
            <ChevronRight color="#252525"/>
          </IonItem>
          <IonItem>
            <IonLabel>Notification settings</IonLabel>
            <ChevronRight color="#252525"/>
          </IonItem>
          <IonItem>
            <IonLabel>Introducing DishDash</IonLabel>
            <ChevronRight color="#252525"/>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;