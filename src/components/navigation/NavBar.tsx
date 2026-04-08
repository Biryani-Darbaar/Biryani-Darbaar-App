import { ArrowLeft, Bell, ShoppingCart } from "lucide-react";
import { useHistory } from "react-router";

import { IonHeader } from "@ionic/react";
import InputSearch from "../Search";

interface NavbarProps {
  publicNav?: boolean;
  name?: string;
}

const Navbar = ({ publicNav, name }: NavbarProps) => {
  const history = useHistory();
  return (
    <IonHeader className="sticky top-0 z-50">
      <nav className="h-20 flex bg-red-800 justify-between items-center gap-6 w-full px-6">
        {publicNav ? (
          <div className="flex items-center gap-4 text-white">
            <button onClick={() => history.goBack()} className="text-white">
              <ArrowLeft />
            </button>
            {name && <span className="text-lg font-semibold">{name}</span>}
          </div>
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
