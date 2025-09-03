import { useState, useEffect } from "react";
import {
  IonPage,
  IonLabel,
} from "@ionic/react";
import {
  Power,
  ChevronRight,
  Pencil,
  Coins,
  Camera,
} from "lucide-react";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
import Navbar from "../components/navigation/NavBar";
import { menuOptions, userOptions } from "../constants/Profile";


const Profile: React.FC = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("User");
  const [userReward, setUserReward] = useState(0);
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("sessionUserId");
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/${userId}`
      );
      setUserName(response.data.userName);
      setUserImage(response.data.imageUrl);
      setUserReward(response.data.reward);
    };
    fetchUserName();
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/logout`);
    sessionStorage.clear();
    history.push("/SignIn");
  };

  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar />
      <div className="flex flex-col gap-8 items-center w-full justify-center py-8 px-6">
        <div className="flex flex-col items-center bg-white">

          {userImage ? (
            <img
              src={userImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-red-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center relative cursor-pointer hover:bg-gray-100 transition"
              onClick={() => document.getElementById("imageInput")?.click()}>
              <div className="flex flex-col items-center text-gray-500">
                <Camera size={24} />
                <span className="text-xs mt-1">Upload</span>
              </div>

              <input
                type="file"
                id="imageInput"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const formData = new FormData();
                    formData.append("image", e.target.files[0]);
                    const response = await axios.post(
                      `${import.meta.env.VITE_API_ENDPOINT}/userImg`,
                      formData,
                      { headers: { "Content-Type": "multipart/form-data" } }
                    );
                    setUserImage(response.data.imageUrl);
                  }
                }}
              />
            </div>

          )}

          <div className="flex items-center justify-center gap-2 my-4">
            <span className="text-2xl font-semibold text-gray-900">{userName}</span>
            <Pencil
              size={20}
              className="text-red-600 cursor-pointer"
              onClick={() => history.push("/EditProfile")}
            />
          </div>

          <div className="flex items-center gap-2 py-2 px-4 bg-gray-100 rounded-xl shadow-sm">
            <Coins size={20} className="text-yellow-500" />
            <span className="text-base font-medium text-gray-800">
              {userReward} pts
            </span>
          </div>
        </div>
          
        <div className="w-full border rounded-lg">
          <div className="bg-white divide-y">
            {userOptions.map(({ label, icon: Icon, path }, index) => (
              <div
                key={index}
                onClick={() => history.push(path)}
                className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 mr-3">
                  <Icon className="text-red-600 w-5 h-5" />
                </div>
                <IonLabel className="text-gray-900 font-medium text-base">
                  {label}
                </IonLabel>
                <ChevronRight className="ml-auto text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full border rounded-lg">
          <div className="bg-white divide-y">
            {menuOptions.map(({ label, icon: Icon, path }, index) => (
              <div
                key={index}
                onClick={() => history.push(path)}
                className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 mr-3">
                  <Icon className="text-red-600 w-5 h-5" />
                </div>
                <IonLabel className="text-gray-900 font-medium text-base">
                  {label}
                </IonLabel>
                <ChevronRight className="ml-auto text-gray-400" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 bg-white w-full border rounded-lg">
          <div
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 mr-3">
              <Power className="text-red-600 w-5 h-5" />
            </div>
            <IonLabel className="text-gray-900 font-medium text-base">
              Sign out
            </IonLabel>
            <ChevronRight className="ml-auto text-gray-400" />
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default Profile;
