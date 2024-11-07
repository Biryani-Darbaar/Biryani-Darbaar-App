import React, { ReactNode } from 'react';
import './Button.css'; // Import your styles

interface ButtonProps {
  onClick: () => void;
  colorType?: 'primary' | 'secondary'; // Add types for theme-based coloring
  children: ReactNode; // Use children instead of label to support nested components
  className?: string; // Add className prop to support custom styling
}

const CustomButton: React.FC<ButtonProps> = ({ children, onClick, colorType = 'primary', className }) => {
  return (
    <button onClick={onClick} className={`custom-btn ${colorType} ${className}`}>
      {children}
    </button>
  );
};

export default CustomButton;