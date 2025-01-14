import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import { updateFilters } from "../../store/slices/searchSlice";
import { motion, AnimatePresence } from "framer-motion";

const filterConfig = [
  { key: "category", label: "Category" },
  { key: "complex", label: "Complex" },
  { key: "area.from", label: "Area From" },
  { key: "area.to", label: "Area To" },
  { key: "renovation", label: "Renovation", isArray: true },
  { key: "floor.from", label: "Floor From" },
  { key: "floor.to", label: "Floor To" },
  { key: "ceilingHeight", label: "Ceiling Height" },
  { key: "bathroom", label: "Bathroom", isArray: true },
  { key: "furniture", label: "Furniture", isArray: true },
  { key: "rooms.rooms", label: "Rooms" },
  { key: "rooms.livingRoom", label: "Living Room" },
  { key: "rooms.bedroom", label: "Bedroom" },
  { key: "rooms.balcony", label: "Balcony" },
  { key: "parkingSlot", label: "Parking Slot" },
  { key: "swimmingPool", label: "Swimming Pool" },
];

export const SelectedFilters = () => {
  const { filters } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  if (!filters) return null;

  const handleRemoveFilter = (category, value) => {
    let updatedFilters = { ...filters };
    if (Array.isArray(updatedFilters[category])) {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== value
      );
    } else {
      const path = category.split(".");
      if (path.length > 1) {
        updatedFilters[path[0]] = {
          ...updatedFilters[path[0]],
          [path[1]]: null,
        };
      } else {
        updatedFilters[category] = null; // Reset to null when removing
      }
    }
    dispatch(updateFilters(updatedFilters));
  };

  const renderFilterList = ({ key, label, isArray = false }) => {
    const path = key.split(".");
    const value = path.length > 1 ? filters[path[0]]?.[path[1]] : filters[key];

    if (
      value &&
      ((isArray && Array.isArray(value) && value.length > 0) ||
        (!isArray && value !== "" && value !== null))
    ) {
      return (
        <motion.div
          key={key}
          className="mb-2 mr-2"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
        >
          <div className="flex flex-wrap items-center justify-start gap-2">
            {isArray ? (
              (Array.isArray(value) ? value : [value]).map(
                (item, index) =>
                  item && (
                    <motion.button
                      key={`${key}-${index}`}
                      className="min-w-[104px] h-[26px] flex items-center justify-between gap-1 px-[4px] py-[2px] text-xs text-[#8247E5] transition-all duration-300 border border-[#8247E5] rounded-sm hover:bg-gray-200"
                      onClick={() => handleRemoveFilter(key, item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <span className="text-[#8247E5] font-semibold text-[14px] leading-5">
                        {item}
                      </span>
                      <IoCloseCircle size={16} color="#8247E5" />
                    </motion.button>
                  )
              )
            ) : (
              <motion.button
                className="min-w-[104px] h-[26px] flex justify-between items-center gap-1 px-[4px] py-[2px] text-xs text-[#8247E5] transition-all duration-300 border border-[#8247E5] rounded-sm hover:bg-gray-200"
                onClick={() => handleRemoveFilter(key, value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              >
                <span className="text-[#8247E5] font-semibold text-[14px] leading-5">
                  {label}: {value}
                </span>
                <IoCloseCircle size={16} color="#8247E5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="flex flex-wrap items-center justify-start gap-2"
          layout
        >
          {filterConfig.map(renderFilterList)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SelectedFilters;
