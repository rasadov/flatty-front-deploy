import { useState } from "react";
import { CheckboxFill, CheckboxSquare, DropdownUnder } from "../assets/icons";

export const Dropdown = ({
  label,
  options = [],
  multiSelect,
  selectedOptions = [],
  onChange,
  customContent,
  children,
  isOpen,
  toggleOpen,
  style = {},
}) => {
  const toggleOption = (option) => {
    if (multiSelect) {
      if (!Array.isArray(selectedOptions)) return;
      onChange(
        selectedOptions.includes(option)
          ? selectedOptions.filter((item) => item !== option)
          : [...selectedOptions, option]
      );
    } else {
      onChange([option]);
    }
  };

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between gap-1 px-2 py-2 w-[133px] h-[32px] bg-white rounded-md shadow-sm focus:border-[#8247E5] focus:outline-none"
        style={{
          boxShadow: "0px 1px 1px 0px #703ACA14",
          ...style,
        }}
      >
        <span className="text-xs font-semibold text-[#525C76]">{label}</span>
        <DropdownUnder />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-[130px] h-[200px] bg-white mx-auto rounded-md shadow-lg overflow-y-auto">
          {customContent
            ? customContent
            : children ||
              (Array.isArray(options)
                ? options.map((option) => (
                    <button
                      key={option}
                      onClick={() => toggleOption(option)}
                      className="flex items-center px-2 py-4 w-[114px] h-[24px] text-sm cursor-pointer gap-2 mx-auto"
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {multiSelect &&
                          (Array.isArray(selectedOptions) &&
                          selectedOptions.includes(option) ? (
                            <CheckboxFill />
                          ) : (
                            <CheckboxSquare />
                          ))}
                        <span
                          className={`text-sm ${
                            Array.isArray(selectedOptions) &&
                            selectedOptions.includes(option)
                              ? "text-black font-semibold"
                              : "text-[#8C93A3]"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    </button>
                  ))
                : null)}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
