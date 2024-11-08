import { Bell, ShoppingCart, Ellipsis, X } from "lucide-react";
import { useHistory } from "react-router";
import React from "react";
import "./Navbar.css";
import { IonButtons, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import InputSearch from "../Search";
const Navbar = () => {
  const history = useHistory();
  return (
    <IonToolbar color="danger">
      {/* <IonTitle className="justify text-center">Menu</IonTitle>
      <IonButtons slot="start">
        <div className="icon-left">
          <Bell className="bell" size={24} />
          <ShoppingCart size={24} />
        </div>
      </IonButtons> */}
      <nav>
        <div className="icon-left">
          <Bell className="bell" size={24} onClick={()=> history.push("/Profile")}/>
          <ShoppingCart size={24} onClick={()=> history.push("/Order")}/>
        </div>
        <div className="search">
          <InputSearch placeholder="Search" />
        </div>
        <div className="icon-right">
          <Ellipsis color="#fff" />
          <div className="verti-line"></div>
          <X color="#fff" />
        </div>
      </nav>
    </IonToolbar>
  );
};

export default Navbar;
