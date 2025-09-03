import React from "react";
import { Search } from "lucide-react";

interface InputSearchProps {
  placeholder: string;
}

const InputSearch: React.FC<InputSearchProps> = ({
  placeholder
}) => {
  return (
    <div className="relative font-sans w-full">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full py-2 pl-4 pr-10 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none text-base text-gray-900 font-semibold bg-white transition"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </span>
    </div>
  );
};

export default InputSearch;
