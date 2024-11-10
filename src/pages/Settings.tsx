import {
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bell, Pencil, ShoppingCart } from "lucide-react";
import "./../assets/css/Settings.css";
import { useHistory } from "react-router";

interface User {
    fullName: string;
    phone: string;
    dob: string;
    gender: string;
    email: string;
    address: string;
}

const Settings = () => {
    const [user, setUser] = useState<User | null>(null);
    const [editingField, setEditingField] = useState<keyof User | null>(null);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const sessionUserId = sessionStorage.getItem("sessionUserId");
    const history = useHistory();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4200/user/${sessionUserId}`
                );
                const userData = response.data;
                const mappedUser: User = {
                    fullName: userData.userName,
                    phone: userData.phoneNumber,
                    dob: "", // Assuming dob is not provided in the response
                    gender: "", // Assuming gender is not provided in the response
                    email: userData.email,
                    address: "", // Assuming address is not provided in the response
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
        if (user) {
            setUser({ ...user, [editingField!]: e.target.value });
            setShowSaveButton(true);
        }
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:4200/user/${sessionUserId}`, user);
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
                <input
                    type="text"
                    className="settings-input"
                    value={user?.[field] || ""}
                    onChange={handleInputChange}
                />
            ) : (
                <span className="settings-span">
                    {user?.[field] || (
                        <input
                            type="text"
                            className="settings-span-input"
                            onChange={handleInputChange}
                        />
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
                <IonToolbar color="danger">
                    <IonTitle className="justify text-center">Personal Page</IonTitle>
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
            <IonContent fullscreen className="settings-content">
                <div className="settings-body">
                    {renderField({ field: "fullName", label: "Full Name" })}
                    {renderField({ field: "phone", label: "Phone" })}
                    {renderField({ field: "dob", label: "Date of Birth" })}
                    {renderField({ field: "gender", label: "Gender" })}
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

export default Settings;
