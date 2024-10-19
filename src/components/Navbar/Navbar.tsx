import { Bell, ShoppingCart, Ellipsis, X } from "lucide-react";
import React from "react";
import "./Navbar.css";
import { IonSearchbar } from "@ionic/react";
import InputSearch from "../Search";
const Navbar = () => {
  return (
    <nav>
      <div className="icon-left">
        <Bell className="bell" />
        <ShoppingCart />
      </div>
      <div className="search">
        <InputSearch placeholder="Search" />
      </div>
      <div className="icon-right">
        <Ellipsis color="#fff" />
        <X color="#fff" />
      </div>
    </nav>
  );
};

export default Navbar;
