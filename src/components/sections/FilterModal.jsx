import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import {
  FilterSelect,
  FilterButtonGroup,
  FilterNumberRange,
  FilterToggle,
} from "../../modules/FilterModalModules";
import { Add, Subtract } from "../../assets/icons";
import { useSearchParams } from "react-router-dom";

export const FilterModal = ({ isOpen, onClose, onApply }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    area: {
      from: null,
      to: null,
    },
    price: {
      RangeMin: null,
      RangeMax: null,
    },
    roomNumber: null,
    city: null,
    category: null,
    livingAreaFrom: null,
    livingAreaTo: null,
    floor: {
      min: null,
      max: null,
    },
    notFirstFloor: null,
    notLastFloor: null,
    lastFloor: null,
    year: null,
    livingRooms: 0,
    bathrooms: 0,
    balconies: 0,
    bedrooms: 0,
    installment: null,
    elevator: null,
    parkingSlot: null,
    gym: null,
    swimmingPool: null,
  });

  useEffect(() => {
    // Load existing query parameters into filters on modal open
    const currentFilters = {};
    searchParams.forEach((value, key) => {
      const [mainKey, subKey] = key.split(".");
      if (subKey) {
        currentFilters[mainKey] = {
          ...currentFilters[mainKey],
          [subKey]: isNaN(value) ? value : Number(value),
        };
      } else {
        currentFilters[key] = isNaN(value) ? value : Number(value);
      }
    });
    setSelectedFilters(currentFilters);
  }, [searchParams]);

  const handleApply = () => {
    const queryParams = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        if (typeof value === "object" && !Array.isArray(value)) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (subValue !== 0 && subValue !== "") {
              queryParams.append(`${key}`, subValue);
            }
          });
        } else {
          queryParams.append(key, value);
        }
      }
    });
    setSearchParams(queryParams);
    onApply(selectedFilters);
    onClose();
  };

  const handleCancel = () => {
    setSelectedFilters({
      areaFrom: null,
      areaTo: null,
      priceRangeMin: null,
      priceRangeMax: null,
      roomNumber: null,
      city: null,
      category: null,
      livingAreaFrom: null,
      livingAreaTo: null,
      minFloor: null,
      maxFloor: null,
      notFirstFloor: null,
      notLastFloor: null,
      lastFloor: null,
      year: null,
      livingRooms: 0,
      bathrooms: 0,
      balconies: 0,
      bedrooms: 0,
      installment: null,
      elevator: null,
      parkingSlot: null,
      gym: null,
      swimmingPool: null,
    });
    onClose();
  };

  const updateFilterValue = (key, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

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
      <div className="fixed z-50 flex items-center justify-center inset-1">
        <motion.div
          className="bg-white rounded-lg w-full max-w-[638px] h-[376px] overflow-auto p-6 relative"
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50, rotate: 10 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Close modal"
            className="absolute text-xl text-gray-500 top-4 right-4"
            onClick={onClose}
          >
            {/* Close icon */}
          </button>
          <h3 className="text-[28px] font-semibold text-left mb-2">Filter</h3>

          {/* Filter Components */}
          <FilterNumberRange
            label="Area (m²)"
            category="areaFrom"
            fromKey="areaFrom"
            toKey="areaTo"
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            updateFilterValue={updateFilterValue}
            unit="m²"
          />
          <FilterButtonGroup
            label="Renovation"
            options={[
              "Cosmetic",
              "Designer",
              "European style",
              "Needs renovation",
            ]}
            category="roomNumber"
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}

            updateFilterValue={updateFilterValue}
          />

          <FilterNumberRange
            label="Floor"
            category="minFloor"
            fromKey="minFloor"
            toKey="maxFloor"
            setSelectedFilters={setSelectedFilters}

            selectedFilters={selectedFilters}
            updateFilterValue={updateFilterValue}
            additionalOptions={["Not first", "Not last", "Last"]}
            unit=""
          />

          <div className="flex flex-wrap justify-between gap-3 my-4">
            {["bathrooms", "livingRooms", "bedrooms", "balconies"].map((type) => (
              <div key={type} className="flex flex-wrap items-center my-2">
                <label className="block text-[10px] font-semibold capitalize text-[#525C76] leading-[16px] mr-2">
                  {type}
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      updateFilterValue(type, Math.max((selectedFilters[type] || 0) - 1, 0))
                    }
                  >
                    <Subtract />
                  </button>
                  <span className="text-[14px] align-middle font-semibold leading-[22.4px]">
                    {selectedFilters[type] || 0}
                  </span>
                  <button
                    onClick={() =>
                      updateFilterValue(type, (selectedFilters[type] || 0) + 1)
                    }
                  >
                    <Add />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleApply}
              className="bg-[#8247E5] text-white px-4 py-2 rounded"
            >
              Apply
            </Button>
            <Button
              variant="cancel"
              onClick={handleCancel}
              className="text-[#4F5B66] text-sm hover:text-[#8247E5] px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FilterModal;