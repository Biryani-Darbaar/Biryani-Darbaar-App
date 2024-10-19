import React from 'react';
import { IonButton } from '@ionic/react';
import './Button.css';  // Import your styles

interface ButtonProps {
  label: string;
  onClick: () => void;
  colorType?: 'primary' | 'secondary';  // Add types for theme-based coloring
}

const CustomButton: React.FC<ButtonProps> = ({ label, onClick, colorType = 'primary' }) => {
  return (
    <button 
      onClick={onClick} 
      className={`custom-btn ${colorType}`}>
      {label}
    </button>
  );
};

export default CustomButton;
