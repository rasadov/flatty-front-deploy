import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "../assets/icons/Close";
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

const filterConfig = [
  { label: "Area (From)", key: "areaFrom" },
  { label: "Area (To)", key: "areaTo" },
  { label: "Renovation", key: "renovation" },
  { label: "Floor (From)", key: "floorFrom" },
  { label: "Floor (To)", key: "floorTo" },
  { label: "Ceiling Height", key: "ceilingHeight" },
  { label: "Bathroom", key: "bathroom" },
  { label: "Furniture", key: "furniture" },
];

const SelectedFilters = () => {
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.filters);

  // Check if selectedFilters is defined
  if (!selectedFilters) return null; // Return nothing if it's undefined

  // Handle filter removal logic
  const handleRemoveFilter = (category, value) => {
    switch (category) {
      case "areaFrom":
        dispatch(setAreaFrom(""));
        break;
      case "areaTo":
        dispatch(setAreaTo(""));
        break;
      case "renovation":
        dispatch(
          setRenovation(
            selectedFilters.renovation.filter((item) => item !== value)
          )
        );
        break;
      case "floorFrom":
        dispatch(setFloorFrom(""));
        break;
      case "floorTo":
        dispatch(setFloorTo(""));
        break;
      case "ceilingHeight":
        dispatch(setCeilingHeight(""));
        break;
      case "bathroom":
        dispatch(setBathroom(""));
        break;
      case "furniture":
        dispatch(
          setFurniture(
            selectedFilters.furniture.filter((item) => item !== value)
          )
        );
        break;
      default:
        break;
    }
  };

  // Render list of selected filters for each category
  const renderFilterList = (filterName, values = [], category) => {
    if (values.length > 0) {
      return (
        <div key={category} className="mb-3">
          <span className="font-semibold">{filterName}:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {values.map((value, index) => (
              <button
                key={index}
                className="flex items-center gap-1 px-3 py-1 border border-[#E2E4E8] text-[#525C76] rounded-lg text-xs hover:bg-[#F5F5F5] transition-all duration-300"
                onClick={() => handleRemoveFilter(category, value)}
              >
                <span>{value}</span>
                <Close className="w-3 h-3 text-gray-500" />
              </button>
            ))}
          </div>
        </div>
      );
    }
    return null; // Return null if no values are present
  };

  return (
    <div className="space-y-4">
      {filterConfig.map(
        ({ label, key }) =>
          selectedFilters[key] &&
          renderFilterList(label, selectedFilters[key], key)
      )}
    </div>
  );
};

export default SelectedFilters;
