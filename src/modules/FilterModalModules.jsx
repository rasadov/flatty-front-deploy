import React from "react";
import {
  isSelected,
  getButtonStyle,
  handleSelect,
  handleToggle,
} from "../utils/filterUtils";
import { ToggleTrue } from "../assets/icons/ToggleTrue";
import { ToggleFalse } from "../assets/icons/ToggleFalse";

const FilterSelect = ({
  label,
  category,
  value,
  options,
  setFilter,
  setSelectedFilters,
  selectedFilters = {},
}) => (
  <div className="flex items-center justify-between mb-3">
    <label className="block text-[12px] font-medium text-[#0F1D40]">
      {label}
    </label>
    <select
      // Safely access the category in selectedFilters, defaulting to an empty string if undefined
      value={selectedFilters[category] ?? ""}
      onChange={(e) =>
        handleSelect(
          setFilter,
          selectedFilters,
          setSelectedFilters,
          category,
          e.target.value,
          true
        )
      }
      className="w-[224px] h-[40px] p-2 bg-[#EEEFF2] border border-[#E2E4E8] rounded-sm text-[#525C76] font-semibold text-[12px] leading-[19.2px]"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

//
const FilterButtonGroup = ({
  label,
  options,
  category,
  setFilter,
  setSelectedFilters,
  selectedFilters = {},
}) => (
  <div className="flex items-center justify-between mb-3">
    <label className="block text-xs font-medium">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() =>
            handleSelect(
              setFilter,
              selectedFilters,
              setSelectedFilters,
              category,
              option,
              false
            )
          }
          className={getButtonStyle(selectedFilters, category, option)}
        >
          {isSelected(selectedFilters, category, option) ? (
            <span className="font-bold">{option}</span>
          ) : (
            option
          )}
        </button>
      ))}
    </div>
  </div>
);
const FilterNumberRange = ({
  label,
  category,
  fromKey,
  toKey,
  setFilter,
  setSelectedFilters,
  selectedFilters,
  additionalOptions = [],
  unit = null,
}) => {
  const getInputProps = (key) => ({
    type: "number",
    value: (selectedFilters[category]?.[key] ?? "").toString(),
    onChange: (e) => {
      const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
      setSelectedFilters({
        ...selectedFilters,
        [category]: {
          ...(selectedFilters[category] || {}),
          [key]: value,
        },
      });
      setFilter(`${category}.${key}`, value);
    },
    className:
      "p-2 border border-[#E2E4E8] bg-[#F5F6F7] rounded-sm w-[146px] h-[40px] text-[#525C76] font-semibold text-[12px] leading-[19.2px] text-center",
  });

  return (
    <div className="flex items-center justify-between mb-3">
      <label className="block text-[12px] font-medium text-[#0F1D40]">
        {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input {...getInputProps(fromKey)} placeholder="from" />
            {unit && (
              <span className="absolute text-xs text-gray-400 right-3 top-3">
                {unit}
              </span>
            )}
          </div>
          <div className="relative">
            <input {...getInputProps(toKey)} placeholder="to" />
            {unit && (
              <span className="absolute text-xs text-gray-400 right-3 top-3">
                {unit}
              </span>
            )}
          </div>
          {additionalOptions.map((option) => (
            <button
              key={option}
              onClick={() =>
                handleSelect(
                  setFilter,
                  selectedFilters,
                  setSelectedFilters,
                  category,
                  option,
                  false
                )
              }
              className={getButtonStyle(selectedFilters, category, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterToggle = ({
  label,
  key,
  filters = {},
  toggleFilter,
  selectedFilters = {},
  setSelectedFilters,
}) => {
  const isToggled = filters[key];

  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      <label className="block text-[10px] font-semibold text-[#525C76]">
        {label}
      </label>
      <button
        onClick={() =>
          handleToggle(toggleFilter, selectedFilters, setSelectedFilters, key)
        }
      >
        {isToggled ? <ToggleTrue /> : <ToggleFalse />}
      </button>
    </div>
  );
};
export { FilterSelect, FilterButtonGroup, FilterNumberRange, FilterToggle };
