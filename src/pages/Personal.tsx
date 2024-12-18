import {
  IonContent,
  IonHeader,
  IonPage,
  IonDatetime,
} from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import "./../assets/css/Settings.css";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar/Navbar";

interface User {
  fullName: string;
  phoneNumber: number;
  dateOfBirth: string;
  email: string;
  address: string;
}

const Personal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editingField, setEditingField] = useState<keyof User | null>(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const sessionUserId = sessionStorage.getItem("sessionUserId");
  const history = useHistory();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/user/${sessionUserId}`
        );
        const userData = response.data;
        const mappedUser: User = {
          fullName: userData.userName,
          phoneNumber: userData.phoneNumber,
          dateOfBirth: userData.dateOfBirth,
          email: userData.email,
          address: userData.address || "", // Assuming address is not provided in the response
        };
        setUser(mappedUser);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [sessionUserId]);

  const handleEditClick = (field: keyof User) => {
    setEditingField(field);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user && editingField) {
      const updatedUser = { ...user, [editingField]: e.target.value };
      setUser(updatedUser);
      setShowSaveButton(true);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/user/${sessionUserId}`, user);
      setEditingField(null);
      setShowSaveButton(false);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  interface RenderFieldProps {
    field: keyof User;
    label: string;
  }

  const renderField = ({ field, label }: RenderFieldProps) => (
    <div key={field} className="settings-field">
      <label className="settings-label">{label}:</label>
      {editingField === field ? (
        field === "dateOfBirth" ? (
          <IonDatetime
            presentation="date"
            value={user?.[field] || ""}
            onIonChange={(e) =>
              handleInputChange({
                target: { value: (e.detail.value as string).split("T")[0] },
              } as any)
            }
          />
        ) : (
          <input
            type="text"
            className="settings-input"
            value={user?.[field] || ""}
            onChange={handleInputChange}
          />
        )
      ) : (
        <span className="settings-span">
          {user?.[field] || (
            <span className="settings-empty">
              Not provided please enter your details{" "}
              <span className="settings-hand-gesture">&#128073;</span>
            </span>
          )}
          <Pencil
            size={16}
            color="red"
            className="settings-span-svg"
            onClick={() => handleEditClick(field)}
          />
        </span>
      )}
    </div>
  );

  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Personal" />
      </IonHeader>
      <IonContent fullscreen className="settings-content">
        <div className="settings-body">
          {renderField({ field: "fullName", label: "Full Name" })}
          {renderField({ field: "phoneNumber", label: "Phone" })}
          {renderField({ field: "dateOfBirth", label: "Date of Birth" })}
          {renderField({ field: "email", label: "Email" })}
          {renderField({ field: "address", label: "Address" })}
          {showSaveButton && (
            <button className="settings-button" onClick={handleSave}>
              Save
            </button>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Personal;
