import React, { useState } from "react";
import "./AddressAndSpecifications.css";
import CustomButton from "./Button";
import {
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface AddressAndSpecificationsProps {
  onClose: () => void;
}

const AddressAndSpecifications: React.FC<AddressAndSpecificationsProps> = ({
  onClose,
}) => {
  const [address, setAddress] = useState("");
  const [orderSpecifications, setOrderSpecifications] = useState("");
  const [error, setError] = useState("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleOrderSpecificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrderSpecifications(e.target.value);
  };

  const handleSubmit = () => {
    if (address.trim() === "") {
      setError("Address field is required.");
    } else {
      sessionStorage.setItem("address", address);
      if (orderSpecifications.trim() !== "") {
        sessionStorage.setItem("orderSpecifications", orderSpecifications);
      }
      onClose();
    }
  };

  return (
    <IonModal isOpen={true} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="popup-header">Address</div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="popup">
          Address
          <textarea
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            style={{ resize: "none", overflow: "hidden" }}
          />
          Order Specifications
          <input
            type="text"
            name="orderSpecifications"
            placeholder="Order specifications"
            value={orderSpecifications}
            onChange={handleOrderSpecificationsChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <CustomButton className="popup" onClick={handleSubmit}>Submit</CustomButton>
          <CustomButton className="popup" colorType="secondary" onClick={onClose}>
            Close
          </CustomButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddressAndSpecifications;
