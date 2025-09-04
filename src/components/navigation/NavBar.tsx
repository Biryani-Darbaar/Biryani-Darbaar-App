import { ArrowLeft, Bell, ShoppingCart } from "lucide-react";
import { useHistory } from "react-router";

import { IonHeader } from "@ionic/react";
import InputSearch from "../Search";

interface NavbarProps {
  publicNav?: boolean;
}

const Navbar = ({ publicNav }: NavbarProps) => {
  const history = useHistory();
  return (
    <IonHeader className="sticky top-0 z-50">
      <nav className="h-20 flex bg-red-800 justify-between items-center gap-6 w-full px-6">
        {publicNav ? (
          <button onClick={() => history.goBack()} className="text-white">
            <ArrowLeft />
          </button>
        ) : (
          <>
            <InputSearch placeholder="Search" />

            <div className="icons flex items-center gap-4">
              <Bell
                className="bell"
                size={24}
                onClick={() => history.push("/Notifications")}
              />
              <ShoppingCart size={24} onClick={() => history.push("/Orders")} />

            </div>
          </>
        )}
      </nav>
    </IonHeader>
  );
};


export default Navbar;