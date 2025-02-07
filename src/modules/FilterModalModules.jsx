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
      {options.map((option) => {
        {
          console.log(option);
        }
        return (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        );
      })}
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
          className={
            getButtonStyle(selectedFilters, category, option) + "  bg-gray-200"
          }
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
      // setFilter(`${category}.${key}`, value);
    },
    className:
      "p-2 border border-[#E2E4E8] rounded-sm w-[106px] h-[40px] text-[#525C76] font-semibold text-[12px] leading-[19.2px] text-left",
  });

  const handleOptionClick = (option) => {
    const currentOptions = (selectedFilters[category]?.options || []).filter(
      (opt) => opt !== option
    );
    const newOptions = currentOptions.includes(option)
      ? currentOptions
      : [...currentOptions, option];

    setSelectedFilters({
      ...selectedFilters,
      [category]: {
        ...(selectedFilters[category] || {}),
        options: newOptions,
      },
    });
    // Assume `setFilter` can handle nested paths like this
    // setFilter(`${category}.options`, newOptions);
  };

  return (
    <div className="flex items-center justify-between mb-3">
      <label className="block text-[12px] font-medium text-[#0F1D40]">
        {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input {...getInputProps(fromKey)} placeholder={fromKey} />
            {unit && (
              <span className="absolute text-xs text-gray-400 right-3 top-3">
                {unit}
              </span>
            )}
          </div>
          <div className="relative">
            <input {...getInputProps(toKey)} placeholder={toKey} />
            {unit && (
              <span className="absolute text-xs text-gray-400 right-3 top-3">
                {unit}
              </span>
            )}
          </div>
          {additionalOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={
                getButtonStyle(selectedFilters, category, option, "options") +
                " bg-gray-200"
              }
            >
              {isSelected(selectedFilters, category, option, "options") ? (
                <span className="font-bold">{option}</span>
              ) : (
                option
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const FilterSingleNumber = ({
  label,
  category,
  placeholderMin,
  placeholderMax,
  categoryMin,
  categoryMax,
  setFilter,
  setSelectedFilters,
  selectedFilters = {},
  children,
}) => {
  // const value = selectedFilters[category] || "";
  const minVal = selectedFilters[categoryMin] || "";
  const maxVal = selectedFilters[categoryMax] || "";
  return (
    <div className="flex items-center justify-between mb-3">
      <label className="block text-xs font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder={placeholderMin}
          value={minVal}
          onChange={(e) => {
            const value =
              e.target.value === "" ? "" : parseInt(e.target.value, 10);
            setSelectedFilters({
              ...selectedFilters,
              [categoryMin]: value,
            });
            // setFilter(category, value);
          }}
          className="p-2 border border-[#E2E4E8] rounded-sm w-[106px] h-[40px] text-[#525C76] font-semibold text-[12px] leading-[19.2px] text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          placeholder={placeholderMax}
          value={maxVal}
          onChange={(e) => {
            const value =
              e.target.value === "" ? "" : parseInt(e.target.value, 10);
            setSelectedFilters({
              ...selectedFilters,
              [categoryMax]: value,
            });
            // setFilter(category, value);
          }}
          className="p-2 border border-[#E2E4E8] rounded-sm w-[106px] h-[40px] text-[#525C76] font-semibold text-[12px] leading-[19.2px] text-left focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {children}
      </div>
    </div>
  );
};

const FilterButtonToggle = ({
  label,
  category,
  options,
  setFilter,
  setSelectedFilters,
  selectedFilters = {},
  placeholder,
}) => (
  <div className="flex items-center justify-between mb-3">
    {/* <label className="block text-xs font-medium">{label}</label> */}
    <div className="flex flex-wrap gap-2">
      <button
        key={category}
        onClick={() =>
          setSelectedFilters({
            ...selectedFilters,
            [category]: !selectedFilters[category],
          })
        }
        className={
          `${
            selectedFilters[category]
              ? "border-[#8247E5] outline outline-2 outline-[#DCD4FF] scale-105"
              : "border-[#E2E4E8] hover:border-[#8247E5] hover:bg-[#F5F6F7]"
          }` +
          getButtonStyle(selectedFilters, category, selectedFilters[category]) +
          "bg-gray-100 px-4 py-2 text-xs font-semibold border text-[#525C76] h-[40px] rounded-sm transition-all duration-300 ease-in-out transform"
        }
      >
        {placeholder}
      </button>
    </div>
  </div>
);

const FilterToggle = ({
  label,
  keyName, // Changed prop name to avoid React warning
  filters = {},
  toggleFilter,
  selectedFilters = {},
  setSelectedFilters,
}) => {
  const isToggled = selectedFilters[keyName] || false;

  return (
    <div className="flex items-center justify-center gap-2 mb-2">
      <label className="block text-[10px] font-semibold text-[#525C76]">
        {label}
      </label>
      <button
        onClick={() => {
          toggleFilter(keyName);
          setSelectedFilters((prev) => ({
            ...prev,
            [keyName]: !prev[keyName],
          }));
        }}
      >
        {isToggled ? <ToggleTrue /> : <ToggleFalse />}
      </button>
    </div>
  );
};
export {
  FilterSelect,
  FilterButtonGroup,
  FilterNumberRange,
  FilterToggle,
  FilterSingleNumber,
  FilterButtonToggle,
};
