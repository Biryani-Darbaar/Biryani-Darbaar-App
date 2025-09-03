import { IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil } from "lucide-react";
import Navbar from "../components/navigation/NavBar";
import { User } from "../types";

const EditProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editingField, setEditingField] = useState<keyof User | null>(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const sessionUserId = sessionStorage.getItem("sessionUserId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_ENDPOINT}/user/${sessionUserId}`
        );
        const userData = response.data;
        setUser({
          fullName: userData.userName,
          phoneNumber: userData.phoneNumber,
          dateOfBirth: userData.dateOfBirth,
          email: userData.email,
          address: userData.address || "",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [sessionUserId]);

  const handleEditClick = (field: keyof User) => setEditingField(field);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user && editingField) {
      setUser({ ...user, [editingField]: e.target.value });
      setShowSaveButton(true);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_ENDPOINT}/user/${sessionUserId}`,
        user
      );
      setEditingField(null);
      setShowSaveButton(false);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const EditableField = ({
    field,
    label,
  }: {
    field: keyof User;
    label: string;
  }) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-gray-700 font-medium">{label}</label>
      {editingField === field ? (
        <input
          type="text"
          value={user[field] || ""}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      ) : (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <span className="text-gray-800">
            {user[field] || (
              <span className="italic text-gray-400">Not provided</span>
            )}
          </span>
          <Pencil
            size={18}
            className="text-red-600 cursor-pointer hover:text-red-700"
            onClick={() => handleEditClick(field)}
          />
        </div>
      )}
    </div>
  );

  return (
    <IonPage className="bg-white">
      <Navbar />
      <div className="flex flex-col gap-8 items-center w-full h-full justify-center py-8 px-6">
        <div className="flex w-full h-full flex-col items-start gap-4">
          <span className="text-2xl text-titleColor font-semibold">
            Edit Profile
          </span>

          <EditableField field="fullName" label="Full Name" />
          <EditableField field="phoneNumber" label="Phone Number" />
          <EditableField field="dateOfBirth" label="Date of Birth" />
          <EditableField field="email" label="Email" />
          <EditableField field="address" label="Address" />

          {showSaveButton && (
            <button
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </IonPage>
  );
};

export default EditProfile;
