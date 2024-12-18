import { Bell, ShoppingCart, Ellipsis, X, ArrowLeft } from "lucide-react";
import { useHistory } from "react-router";
import React from "react";
import "./Navbar.css";
import { IonButtons, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import InputSearch from "../Search";
const Navbar = ({ name }: { name?: string }) => {
  const history = useHistory();
  return (
    <IonToolbar color="danger">
      <nav>
        {/* Left Icon */}
        <div className="icon-left">
          <ArrowLeft size={24} onClick={() => history.goBack()} />
        </div>

        {/* Centered Name or Search */}
        <div className="search">
          {name ? (
            <h3 className="nav-name">{name}</h3>
          ) : (
            <InputSearch placeholder="Search" />
          )}
        </div>

        {/* Right Icons */}
        <div className="icon-right">
          <ShoppingCart size={24} onClick={() => history.push("/Order")} />
          <Bell
            className="bell"
            size={24}
            onClick={() => history.push("/Profile")}
          />
        </div>
      </nav>
    </IonToolbar>
  );
};


export default Navbar;