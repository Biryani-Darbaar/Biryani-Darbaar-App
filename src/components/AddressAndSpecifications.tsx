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
  const [formData, setFormData] = useState({
    fullName: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
    landmark: "",
    deliveryInstructions: "",
  });
  const [error, setError] = useState("");

  // Define the type for keys of formData
  type FormDataKey = keyof typeof formData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as FormDataKey]: value,
    }));
  };

  const handleSubmit = () => {
    const requiredFields: FormDataKey[] = [
      "fullName",
      "streetAddress1",
      "city",
      "state",
      "postalCode",
      "country",
      "phoneNumber",
    ];
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      setError(`Please fill out: ${missingFields.join(", ")}`);
    } else {
      sessionStorage.setItem("addressData", JSON.stringify(formData));
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
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <label>Street Address</label>
          <input
            type="text"
            name="streetAddress1"
            placeholder="Street Address Line 1"
            value={formData.streetAddress1}
            onChange={handleChange}
          />
          <input
            type="text"
            name="streetAddress2"
            placeholder="Street Address Line 2 (Optional)"
            value={formData.streetAddress2}
            onChange={handleChange}
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <label>State/Province</label>
          <input
            type="text"
            name="state"
            placeholder="State/Province"
            value={formData.state}
            onChange={handleChange}
          />
          <label>Postal/ZIP Code</label>
          <input
            type="text"
            name="postalCode"
            placeholder="Postal/ZIP Code"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <label>Country</label>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <label>Email Address (Optional)</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <label>Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            placeholder="Landmark"
            value={formData.landmark}
            onChange={handleChange}
          />
          <label>Delivery Instructions (Optional)</label>
          <textarea
            name="deliveryInstructions"
            placeholder="Delivery Instructions"
            value={formData.deliveryInstructions}
            onChange={handleChange}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <CustomButton className="popup" onClick={handleSubmit}>
            Submit
          </CustomButton>
          <CustomButton
            className="popup"
            colorType="secondary"
            onClick={onClose}
          >
            Close
          </CustomButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default AddressAndSpecifications;
