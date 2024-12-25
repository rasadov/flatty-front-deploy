import React, { useState, useEffect } from "react";
import { Close } from "../assets/icons/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  setAreaFrom,
  setAreaTo,
  setRenovation,
  setFloorFrom,
  setFloorTo,
  setCeilingHeight,
  setBathroom,
  setFurniture,
} from "../store/slices/filterSlice";
import { motion } from "framer-motion";
import Button from "./Button";

const FilterModal = ({ isOpen, onClose, onApply }) => {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.filters);

  const [selectedFilters, setSelectedFilters] = useState({
    areaFrom: filterData?.areaFrom || "",
    areaTo: filterData?.areaTo || "",
    renovation: filterData?.renovation || [],
    floorFrom: filterData?.floorFrom || "",
    floorTo: filterData?.floorTo || "",
    ceilingHeight: filterData?.ceilingHeight || "",
    bathroom: filterData?.bathroom || "",
    furniture: filterData?.furniture || [],
  });

  useEffect(() => {
    setSelectedFilters({
      areaFrom: filterData?.areaFrom || "",
      areaTo: filterData?.areaTo || "",
      renovation: filterData?.renovation || [],
      floorFrom: filterData?.floorFrom || "",
      floorTo: filterData?.floorTo || "",
      ceilingHeight: filterData?.ceilingHeight || "",
      bathroom: filterData?.bathroom || "",
      furniture: filterData?.furniture || [],
    });
  }, [filterData]);

  const handleButtonClick = (category, value, isSingleSelect, e) => {
    e.stopPropagation(); // Prevent modal from closing when clicking a button

    setSelectedFilters((prev) => {
      const newSelectedFilters = { ...prev };

      if (isSingleSelect) {
        newSelectedFilters[category] =
          newSelectedFilters[category] === value ? "" : value;
      } else {
        if (newSelectedFilters[category]?.includes(value)) {
          newSelectedFilters[category] = newSelectedFilters[category].filter(
            (item) => item !== value
          );
        } else {
          newSelectedFilters[category] = [
            ...(newSelectedFilters[category] || []),
            value,
          ];
        }
      }

      // Dispatch the appropriate action creator based on the category
      switch (category) {
        case "areaFrom":
          dispatch(setAreaFrom(newSelectedFilters.areaFrom));
          break;
        case "areaTo":
          dispatch(setAreaTo(newSelectedFilters.areaTo));
          break;
        case "renovation":
          dispatch(setRenovation(newSelectedFilters.renovation));
          break;
        case "floorFrom":
          dispatch(setFloorFrom(newSelectedFilters.floorFrom));
          break;
        case "floorTo":
          dispatch(setFloorTo(newSelectedFilters.floorTo));
          break;
        case "ceilingHeight":
          dispatch(setCeilingHeight(newSelectedFilters.ceilingHeight));
          break;
        case "bathroom":
          dispatch(setBathroom(newSelectedFilters.bathroom));
          break;
        case "furniture":
          dispatch(setFurniture(newSelectedFilters.furniture));
          break;
        default:
          break;
      }

      // Log the selected filters to the console
      console.log("Selected Filters:", newSelectedFilters);

      return newSelectedFilters;
    });
  };

  const getButtonStyle = (category, value) => {
    const isSelected = selectedFilters[category]?.includes(value);
    return `px-4 py-2 text-xs font-semibold border text-[#525C76] h-[35px] rounded-sm transition-all duration-300 ease-in-out transform ${
      isSelected
        ? " border-[#8247E5] outline outline-2 outline-[#DCD4FF] scale-105"
        : "border-[#E2E4E8] hover:border-[#8247E5] hover:bg-[#F0F0F5]"
    }`;
  };

  const handleCancel = () => {
    dispatch(clearFilters());
    onClose();
  };

  const isApplyDisabled = Object.values(selectedFilters).every(
    (value) =>
      (Array.isArray(value) && value.length === 0) ||
      value === "" ||
      value == []
  );

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div
        className="fixed z-50 flex items-center justify-center inset-1"
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 50,
          rotate: 10,
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <div
          className="bg-white rounded-lg w-full max-w-[632px] h-[462px] overflow-auto py-[24px] px-[32px] relative"
          onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
        >
          <button
            className="absolute text-xl text-gray-500 top-6 right-6"
            onClick={onClose}
          >
            <Close />
          </button>

          <h3 className="text-[28px] font-semibold text-left">Filter</h3>

          <div className="space-y-5">
            {/* Area Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">Area</label>
              <div className="flex flex-col justify-between gap-2 md:flex-row">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="from"
                    value={selectedFilters?.areaFrom || ""}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        areaFrom: e.target.value,
                      })
                    }
                    className="flex-1 p-2 border border-gray-300 bg-white rounded-md w-[146px] h-[35px]"
                  />
                  <span className="absolute text-xs text-gray-400 right-3 top-2">
                    м²
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="to"
                    value={selectedFilters?.areaTo || ""}
                    onChange={(e) =>
                      setSelectedFilters({
                        ...selectedFilters,
                        areaTo: e.target.value,
                      })
                    }
                    className="flex-1 p-2 border border-gray-300 bg-white rounded-md w-[146px] h-[35px]"
                  />
                  <span className="absolute text-xs text-gray-400 right-3 top-2">
                    м²
                  </span>
                </div>
              </div>
            </div>

            {/* Renovation Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">Renovation</label>
              <div className="flex flex-wrap justify-between gap-2">
                {[
                  "Cosmetic",
                  "Designer",
                  "European style",
                  "Needs renovation",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={(e) =>
                      handleButtonClick("renovation", option, false, e)
                    }
                    className={getButtonStyle("renovation", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">Floor</label>
              <div className="flex flex-wrap justify-between gap-2">
                <input
                  type="text"
                  placeholder="from"
                  value={selectedFilters?.floorFrom || ""}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      floorFrom: e.target.value,
                    })
                  }
                  className="flex-1 p-2 border border-gray-300 bg-white rounded-md w-[85px] h-[35px]"
                />
                <input
                  type="text"
                  placeholder="to"
                  value={selectedFilters?.floorTo || ""}
                  onChange={(e) =>
                    setSelectedFilters({
                      ...selectedFilters,
                      floorTo: e.target.value,
                    })
                  }
                  className="flex-1 p-2 border border-gray-300 bg-white rounded-md w-[85px] h-[35px]"
                />
                {["Not first", "Not last", "Last"].map((option) => (
                  <button
                    key={option}
                    onClick={(e) => handleButtonClick("floor", option, true, e)}
                    className={getButtonStyle("floor", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Ceiling Height Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">
                Ceiling height
              </label>
              <div className="flex flex-wrap justify-between gap-2">
                {["From 2.5m", "From 2.7m", "From 3m"].map((option) => (
                  <button
                    key={option}
                    onClick={(e) =>
                      handleButtonClick("ceilingHeight", option, true, e)
                    }
                    className={getButtonStyle("ceilingHeight", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Bathroom Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">Bathroom</label>
              <div className="flex flex-wrap justify-between gap-2">
                {["Combined", "Separate", "Several"].map((option) => (
                  <button
                    key={option}
                    onClick={(e) =>
                      handleButtonClick("bathroom", option, false, e)
                    }
                    className={getButtonStyle("bathroom", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Furniture Section */}
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <label className="block text-xs font-medium">Furniture</label>
              <div className="flex flex-wrap justify-between gap-2">
                {[
                  "Without furniture",
                  "With furniture",
                  "Kitchen furniture",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={(e) =>
                      handleButtonClick("furniture", option, false, e)
                    }
                    className={getButtonStyle("furniture", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Button
                onClick={() => {
                  onApply(selectedFilters);
                  onClose();
                }}
                className={`bg-[#8247E5] text-white px-[12px] py-[6px] w-[110px] h-[34px] rounded-[3px] ${
                  isApplyDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isApplyDisabled}
              >
                Apply
              </Button>
              <Button
                variant="cancel"
                onClick={handleCancel}
                className="text-[#4F5B66] text-sm hover:text-[#8247E5] px-5 py-2 rounded-[3px] w-[110px] h-[34px]"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterModal;
