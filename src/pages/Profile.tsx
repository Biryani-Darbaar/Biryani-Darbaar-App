import { useState, useEffect } from "react";
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
import {
  Bell,
  IdCard,
  Power,
  ReceiptText,
  ScanQrCode,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Tags,
  ChevronRight,
  Pencil,
} from "lucide-react";
import "../assets/css/Profile.css";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";

const Profile: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("User");
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("sessionUserId");
      const response = await axios.get(`https://api.darbaarkitchen.com/user/${userId}`);
      setUserName(response.data.userName);
      setUserImage(response.data.imageUrl);
    };
    fetchUserName();
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    const res = await axios.post("https://api.darbaarkitchen.com/logout");
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
        {/* User profile picture and name */}
        <div className="profile-header">
          {userImage ? (
            <img src={userImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">
              <div className="profile-container">
                <h4>Please upload profile picture &#128073;</h4>
                <Pencil
                  size={16}
                  color="red"
                  onClick={() => document.getElementById("imageInput")?.click()}
                  className="profile-edit-icon"
                />
              </div>
              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const formData = new FormData();
                    formData.append("image", e.target.files[0]);
                    const response = await axios.post(
                      "https://api.darbaarkitchen.com/userImg",
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    setUserImage(response.data.imageUrl);
                  }
                }}
              />
            </div>
          )}
          <div className="profile-name">
            <h2>{userName}</h2>
            <Pencil
              size={16}
              color="red"
              className="profile-edit-icon"
              onClick={() => history.push("/Personal")}
            />
          </div>
        </div>

        {/* Menu items */}
        <IonItem button onClick={() => history.push("/Orders")}>
          <ReceiptText color="#EA1F27" className="icon-profile" />
          <IonLabel>My order</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
        <IonItem button onClick={() => history.push("/Offer")}>
          <Tags color="#EA1F27" className="icon-profile" />
          <IonLabel>My offer</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
        <IonItem button onClick={() => history.push("/Member")}>
          <IdCard color="#EA1F27" className="icon-profile" />
          <IonLabel>Member</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
        <IonItem button onClick={() => history.push("/Settings")}>
          <Settings color="#EA1F27" className="icon-profile" />
          <IonLabel>Setting</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
        <IonItem button onClick={() => history.push("/Terms")}>
          <ShieldCheck color="#EA1F27" className="icon-profile" />
          <IonLabel>Terms of use</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
        <IonItem button onClick={() => history.push("/Privacy")}>
          <ShieldCheck color="#EA1F27" className="icon-profile" />
          <IonLabel>Privacy policy</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>

        {/* Sign out */}
        <IonItem button onClick={handleSignOut}>
          <Power color="#EA1F27" className="icon-profile" />
          <IonLabel>Sign out</IonLabel>
          <ChevronRight color="#252525" />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
