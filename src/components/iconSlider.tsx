import React from "react";
import "./iconSlider.css";
import cream from "../assets/icons/cream.png";
import grill from "../assets/icons/grill.png";
import momo from "../assets/icons/momo.png";
import spoon from "../assets/icons/spoon.png";
import CustomButton from "./Button";

interface IconSliderProps {
  items: { name: string }[];
  onCategoryClick: (name: string) => void; // New prop
}

const IconScroll: React.FC<IconSliderProps> = ({ items, onCategoryClick }) => {
  return (
    <div className="icon-scroll-container">
      {items.map((item, index) => (
        <div key={index} className="icon-scroll-item">
          <CustomButton colorType="secondary" onClick={() => onCategoryClick(item.name)}>
            <img
              src={[cream, grill, momo, spoon][index % 4]}
              alt={item.name}
              className="icon-scroll-image"
            />
            <div className="icon-scroll-name">{item.name}</div>
          </CustomButton>
        </div>
      ))}
    </div>
  );
};

export default IconScroll;
