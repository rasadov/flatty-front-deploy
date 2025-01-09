import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import { useFilters } from "../../hooks/useFilters";
import {
  handleSelect,
  getButtonStyle,
  handleNumericChange,
  handleToggle,
  isApplyDisabled,
} from "../../utils/filterUtils";
import {
  FilterSelect,
  FilterButtonGroup,
  FilterNumberRange,
  FilterToggle,
} from "../../modules/FilterModalModules";
import { Add, Subtract } from "../../assets/icons";

export const FilterModal = ({ isOpen, onClose, onApply }) => {
  const {
    filters = {},
    setFilter,
    toggleFilter,
    incrementFilter,
    decrementFilter,
    clearFilters,
    updateFilters,
  } = useFilters();

  // Local state for UI interactions
  const [selectedFilters, setSelectedFilters] = useState(filters);

  useEffect(() => {
    // Sync selectedFilters with filters when modal opens or filters change externally
    setSelectedFilters(filters);
  }, []);

  const handleApply = () => {
    updateFilters(selectedFilters);
    onApply(selectedFilters); // If onApply needs to do something with the filters
    onClose();
  };

  const handleCancel = () => {
    clearFilters();
    onClose();
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
          className="bg-white rounded-lg w-full max-w-[638px] h-[676px] overflow-auto p-6 relative"
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
          <FilterSelect
            label="Category"
            value={filters?.category || ""}
            onChange={(e) => setFilter("category", e.target.value)}
            options={[
              { value: "", label: "Choose Category" },
              { value: "Residence Complex", label: "Residence Complex" },
            ]}
          />

          <FilterSelect
            label="Complex"
            value={filters?.complex || ""}
            onChange={(e) => setFilter("complex", e.target.value)}
            options={[
              { value: "", label: "Choose Complex" },
              // Add your complex options here
            ]}
          />

          <FilterNumberRange
            label="Area (m²)"
            category="area"
            fromKey="from"
            toKey="to"
            filters={filters}
            setFilter={setFilter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            unit="м²"
          />

          <FilterButtonGroup
            label="Renovation"
            options={[
              "Cosmetic",
              "Designer",
              "European style",
              "Needs renovation",
            ]}
            filters={filters}
            category="renovation"
            setFilter={setFilter}
          />

          <FilterNumberRange
            label="Floor"
            category="floor"
            fromKey="from"
            toKey="to"
            filters={filters}
            setFilter={setFilter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            additionalOptions={["Not first", "Not last", "Last"]}
          />

          <FilterButtonGroup
            label="Ceiling Height"
            options={["From 2.5m", "From 2.7m", "From 3m"]}
            filters={filters}
            category="ceilingHeight"
            setFilter={setFilter}
          />

          <FilterButtonGroup
            label="Bathroom"
            options={["Combined", "Separate", "Several"]}
            filters={filters}
            category="bathroom"
            setFilter={setFilter}
          />

          <FilterButtonGroup
            label="Furniture"
            options={[
              "Without furniture",
              "With furniture",
              "Kitchen furniture",
            ]}
            filters={filters}
            category="furniture"
            setFilter={setFilter}
          />

          {/* Rooms */}
          <div className="flex flex-wrap items-center justify-start gap-3 mb-4 space-y-2">
            {["rooms", "bathroom", "livingRoom", "bedroom", "balcony"].map(
              (type) => (
                <div key={type} className="flex flex-wrap items-center gap-4">
                  <label className="block text-[10px] font-semibold capitalize text-[#525C76] leading-[16px]">
                    {type}
                  </label>
                  <div className="flex items-center gap-1">
                    <button onClick={() => decrementFilter(`rooms.${type}`)}>
                      <Subtract />
                    </button>
                    <span className="text-[14px] align-middle font-semibold leading-[22.4px]">
                      {filters.rooms?.[type] || 0}
                    </span>
                    <button onClick={() => incrementFilter(`rooms.${type}`)}>
                      <Add />
                    </button>
                  </div>
                </div>
              )
            )}
            {["parkingSlot", "swimmingPool"].map((key) => (
              <FilterToggle
                key={key}
                label={key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                filters={filters}
                toggleFilter={toggleFilter}
              />
            ))}
          </div>

          {/* Toggles */}
          <div className="flex justify-start gap-6 mb-4"></div>

          {/* Apply and Cancel buttons */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => {
                handleApply();
                onClose();
              }}
              className={`bg-[#8247E5] text-white px-4 py-2 rounded ${
                isApplyDisabled(filters) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isApplyDisabled(selectedFilters)}
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
