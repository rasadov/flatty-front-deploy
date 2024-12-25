import { useState } from "react";
import { CheckboxFill, CheckboxSquare, DropdownUnder } from "../assets/icons";

const Dropdown = ({
  label,
  options,
  multiSelect,
  selectedOptions,
  onChange,
  customContent,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option) => {
    if (multiSelect) {
      onChange(
        selectedOptions.includes(option)
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option]
      );
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white border border-gray-300 rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
      >
        <span className="text-xs font-semibold text-[#525C76]">{label}</span>
        <DropdownUnder />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-[130px] h-[200px] bg-white border mx-auto border-gray-300 rounded-md shadow-lg overflow-y-auto">
          {customContent
            ? customContent
            : children || // If no customContent, render children passed as dynamic content
              options.map((option) => (
                <label
                  key={option}
                  className={`flex items-center px-2 py-4 w-[114px] h-[24px] text-sm cursor-pointer gap-2 mx-auto ${
                    multiSelect ? "hover:bg-gray-100" : ""
                  }`}
                >
                  {multiSelect && (
                    <div className="mr-1">
                      {/* Checkbox Icon Switch with Animation */}
                      {selectedOptions.includes(option) ? (
                        <div className="checkbox-icon">
                          <CheckboxFill />
                        </div>
                      ) : (
                        <div className="checkbox-icon">
                          <CheckboxSquare />
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => toggleOption(option)}
                    className={`w-full text-left text-sm ${
                      selectedOptions.includes(option)
                        ? "text-black font-semibold"
                        : "text-[#8C93A3]"
                    }`}
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {option}
                  </button>
                </label>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
