import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "../../assets/icons";
const SearchbarDropdown = ({
  label,
  options,
  selected,
  onSelect,
  icon = null,
  inputs = null,
  onInputChange = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 bg-white border-l-2 h-[54px] text-sm font-semibold text-[#525C76]"
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{selected || label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown />
        </motion.div>
      </button>
      {isOpen && (
        <motion.div
          className="absolute left-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {options ? (
            <ul className="p-2">
              {options.map((option, idx) => (
                <li
                  key={idx}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selected === option ? "font-bold text-[#8247E5]" : ""
                  }`}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          ) : inputs ? (
            <div className="relative z-50 p-4">
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={inputs.min || ""}
                  onChange={(e) => onInputChange("min", e.target.value)}
                  className="w-1/2 px-2 py-1 text-sm border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={inputs.max || ""}
                  onChange={(e) => onInputChange("max", e.target.value)}
                  className="w-1/2 px-2 py-1 text-sm border rounded-md"
                />
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};
export default SearchbarDropdown;
