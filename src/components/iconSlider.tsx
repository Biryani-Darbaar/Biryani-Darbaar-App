import React, { useEffect } from "react";
import "./iconSlider.css";
import cream from "../assets/icons/cream.png";
import grill from "../assets/icons/grill.png";
import momo from "../assets/icons/momo.png";
import spoon from "../assets/icons/spoon.png";
import miniGrill from "../assets/icons/mini-grill.png";
import pot from "../assets/icons/pot.png";
import whiteCream from "../assets/icons/white-cream.png";
import whiteGrill from "../assets/icons/white-grill.png";
import whiteMomo from "../assets/icons/white-momo.png";
import whiteSpoon from "../assets/icons/white-spoon.png";
import whiteMiniGrill from "../assets/icons/white-mini-grill.png";
import whitePot from "../assets/icons/white-pot.png";
import CustomButton from "./Button";

interface IconSliderProps {
  items: { name: string }[];
  onCategoryClick: (name: string) => void;
  activeCategory?: string; // New prop
}

const IconScroll: React.FC<IconSliderProps> = ({
  items,
  onCategoryClick,
  activeCategory,
}) => {
  return (
    <div className="icon-scroll-container">
      {items.map((item, index) => (
        <div key={index} className="icon-scroll-item">
          <CustomButton
            colorType={item.name === activeCategory ? "primary" : "secondary"} // Change colorType based on activeCategory
            onClick={() => onCategoryClick(item.name)}
          >
            {item.name !== activeCategory ? (
              <>
                <img
                  src={[cream, grill, momo, spoon, miniGrill, pot][index % 6]}
                  alt={item.name}
                  className="icon-scroll-image"
                />
                <div className="icon-scroll-name">{item.name}</div>
              </>
            ) : (
              <>
                <img
                  src={
                    [
                      whiteCream,
                      whiteGrill,
                      whiteMomo,
                      whiteSpoon,
                      whiteMiniGrill,
                      whitePot,
                    ][index % 6]
                  }
                  alt={item.name}
                  className="icon-scroll-image"
                />
                <div className="icon-scroll-name white">{item.name}</div>
              </>
            )}
          </CustomButton>
        </div>
      ))}
    </div>
  );
};

export default IconScroll;
