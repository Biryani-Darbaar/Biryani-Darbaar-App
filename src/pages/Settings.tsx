import React from "react";
import { IonPage, IonLabel } from "@ionic/react";
import {
  ChevronRight,
  Lock,
  Info,
  Globe,
  BellRing,
  UtensilsCrossed,
} from "lucide-react";
import { useHistory } from "react-router";
import Navbar from "../components/navigation/NavBar";

const Settings: React.FC = () => {
  const history = useHistory();

  const accountOptions = [
    {
      label: "Password & Security",
      icon: Lock,
      path: "/PasswordSecurity", //TODO: Create this page
    },
    {
      label: "Application Version",
      icon: Info,
      path: "/AppVersion", //TODO: Create this page
    },
  ];

  const generalOptions = [
    {
      label: "Languages",
      icon: Globe,
      path: "/Languages", //TODO: Create this page
    },
    {
      label: "Notification Settings",
      icon: BellRing,
      path: "/Notifications", //TODO: Create this page
    },
    {
      label: "Introducing DishDash",
      icon: UtensilsCrossed,
      path: "/DishDash", //TODO: Create this page
    },
  ];

  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar />
      <div className="flex flex-col gap-8 items-center w-full h-full justify-center py-8 px-6">
        <div className="flex w-full h-full flex-col items-start gap-4">
          <span className="text-2xl text-titleColor font-semibold"> Settings
          </span>
          <div className="w-full border rounded-lg mt-4">
            <div className="bg-white divide-y">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                Account Settings
              </div>
              {accountOptions.map(({ label, icon: Icon, path }, index) => (
                <div
                  key={index}
                  onClick={() => history.push(path)}
                  className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition cursor-pointer"
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

          {/* General Section */}
          <div className="w-full border rounded-lg">
            <div className="bg-white divide-y">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                General Information
              </div>
              {generalOptions.map(({ label, icon: Icon, path }, index) => (
                <div
                  key={index}
                  onClick={() => history.push(path)}
                  className="w-full flex items-center px-4 py-4 hover:bg-gray-50 transition cursor-pointer"
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
        </div>
      </div>

    </IonPage>
  );
};

export default Settings;
