import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { Bell, IdCard, Power, ReceiptText, ScanQrCode, Settings, ShieldCheck, ShoppingCart, Tags } from "lucide-react";
import "../assets/css/Profile.css";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
import { useEffect } from "react";

const Profile: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("User");
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("sessionUserId");
      const response = await axios.get(`http://localhost:4200/user/${userId}`);
      setUserName(response.data.userName);
      console.log("User name:", response.data);
      
    };
    fetchUserName();
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    const res = await axios.post("https://biryani-darbar-server.vercel.app/logout");
    console.log("Sign out response:", res);
    sessionStorage.clear();
    history.push("/");
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle className="justify text-center">Personal</IonTitle>
          <IonButtons slot="start">
            <div className="icon-left">
              <Bell className="bell" size={24} onClick={() => history.push("/Profile")} />
              <ShoppingCart size={24} onClick={() => history.push("/Order")} />
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* User profile picture and name */}
        <div className="profile-header">
          <img src="path_to_profile_image" alt="Profile" className="profile-image" />
          <h2>{userName}</h2>
        </div>

        {/* Menu items */}
        <IonItem  button onClick={() => history.push("/Orders")}>
          <div className="ion-item-profile">

          <ReceiptText color="#EA1F27" className="icon-profile"/>
          <IonLabel>My order</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Offer")}>
          <div className="ion-item-profile">

          <Tags color="#EA1F27" className="icon-profile"/>
          <IonLabel>My offer</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Member")}>
          <div className="ion-item-profile">

          <IdCard color="#EA1F27" className="icon-profile" />
          <IonLabel>Member</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Referral")}>
          <div className="ion-item-profile">

          <ScanQrCode color="#EA1F27" className="icon-profile" />
          <IonLabel>Referral code</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Settings")}>
          <div className="ion-item-profile">

          <Settings color="#EA1F27" className="icon-profile" />
          <IonLabel>Setting</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Terms")}>
          <div className="ion-item-profile">

          <ShieldCheck color="#EA1F27" className="icon-profile" />
          <IonLabel>Terms of use</IonLabel>
          </div>
        </IonItem>
        <IonItem  button onClick={() => history.push("/Privacy")}>
          <div className="ion-item-profile">

          <ShieldCheck color="#EA1F27" className="icon-profile" />
          <IonLabel>Privacy policy</IonLabel>
          </div>
        </IonItem>
        
        {/* Sign out */}
        <IonItem button onClick={handleSignOut}>
          <Power color="#EA1F27" className="icon-profile"/>
          <IonLabel>Sign out</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
