import React from "react";
import { Search } from "lucide-react";
import "./Search.css"; // Import your external CSS

interface InputSearchProps {
  placeholder: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder
}) => {
    console.log('placeholder', placeholder);
    
  return (
    <div className={`input-container`}>
      <input type="text" placeholder={placeholder}  className="input-field"/>
      <div className="search-icon-right">
        <Search size={20} color="#000" />
      </div>
    </div>
  );
};

export default InputSearch;
