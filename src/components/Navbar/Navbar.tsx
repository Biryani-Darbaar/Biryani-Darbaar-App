import { Bell, ShoppingCart, Ellipsis, X } from "lucide-react";
import React from "react";
import "./Navbar.css";
import { IonSearchbar } from "@ionic/react";
import InputSearch from "../Search";
const Navbar = () => {
  return (
    <nav>
      <div className="icon-left">
        <Bell className="bell" size={24}/>
        <ShoppingCart size={24}/>
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
  );
};

export default Navbar;
