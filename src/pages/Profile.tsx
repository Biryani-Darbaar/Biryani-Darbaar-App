import { cart, notifications } from "ionicons/icons";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "../assets/css/Profile.css";
import SignOutButton from "../components/SignoutButton";
import { Bell, IdCard, Power, ReceiptText, ScanQrCode, Settings, ShieldCheck, ShoppingCart, Tags } from "lucide-react";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle className="justify text-center">Personal</IonTitle>
          <IonButtons slot="start">
            <div className="icon-left">
              <Bell className="bell" size={24} />
              <ShoppingCart size={24} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <img src="" alt="" />

        <Tags />
        <IdCard />
        <ScanQrCode />
        <Settings />
        <ReceiptText />
        <ShieldCheck />
        <Power />
        <SignOutButton />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
