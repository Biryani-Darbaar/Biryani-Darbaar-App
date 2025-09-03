import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/navigation/NavBar";
import "../assets/css/Languages.css";

const Languages = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Languages" />
      </IonHeader>
      <IonContent>
        <div className="languages">
          <h2 className="languages__title">Languages Available</h2>
          <IonRadioGroup value="english" className="languages__radio-group">
            <div className="languages__radio-option">
              <IonRadio value="english" />
              <IonLabel className="languages__radio-label">
                <h2>English</h2>
              </IonLabel>
            </div>
          </IonRadioGroup>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Languages;
