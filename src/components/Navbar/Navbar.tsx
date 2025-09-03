import { Bell, ShoppingCart } from "lucide-react";
import { useHistory } from "react-router";

import { IonToolbar } from "@ionic/react";
import InputSearch from "../Search";
const Navbar = () => {
  const history = useHistory();
  return (
    <IonToolbar color="danger">
      <nav className="h-16 flex justify-between items-center gap-6 w-full px-6">
        <InputSearch placeholder="Search" />

        <div className="icons flex items-center gap-4">
          <Bell
            className="bell"
            size={24}
            onClick={() => history.push("/Notifications")}
          />
          <ShoppingCart size={24} onClick={() => history.push("/Orders")} />

        </div>
      </nav>
    </IonToolbar>
  );
};


export default Navbar;