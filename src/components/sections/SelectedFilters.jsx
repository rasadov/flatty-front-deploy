import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import { useFilters } from "../../hooks/useFilters";

const filterConfig = [
  { key: "category" },
  { key: "complex" },
  { key: "area.from" },
  { key: "area.to" },
  { key: "renovation", isArray: true },
  { key: "floor.from" },
  { key: "floor.to" },
  { key: "ceilingHeight" },
  { key: "bathroom", isArray: true },
  { key: "furniture", isArray: true },
  { key: "rooms.rooms" },
  { key: "rooms.livingRoom" },
  { key: "rooms.bedroom" },
  { key: "rooms.balcony" },
  { key: "parkingSlot" },
  { key: "swimmingPool" },
];

export const SelectedFilters = () => {
  const { filters, setFilter, toggleFilter, clearFilters } = useFilters();
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    complex: "",
    areaFrom: "",
    areaTo: "",
    renovation: [],
    floorFrom: "",
    floorTo: "",
    ceilingHeight: "",
    bathroom: [],
    furniture: [],
    roomsRooms: "",
    roomsLivingRoom: "",
    roomsBedroom: "",
    roomsBalcony: "",
    parkingSlot: "",
    swimmingPool: "",
  });

  if (!filters) return null;

  // Filterləri silmək üçün məntiq
  const handleRemoveFilter = (category, value) => {
    const path = category.split(".");
    if (path.length > 1) {
      const [mainCategory, subCategory] = path;
      if (Array.isArray(filters[mainCategory][subCategory])) {
        dispatch(
          setFilter(
            category,
            filters[mainCategory][subCategory].filter((item) => item !== value)
          )
        );
      } else {
        dispatch(setFilter(category, ""));
      }
    } else {
      if (Array.isArray(filters[category])) {
        dispatch(
          setFilter(
            category,
            filters[category].filter((item) => item !== value)
          )
        );
      } else {
        dispatch(setFilter(category, ""));
      }
    }
  };

  const renderFilterList = ({ key, isArray = false }) => {
    const path = key.split(".");
    const values =
      path.length > 1 ? filters[path[0]][path[1]] : filters[path[0]];

    if (
      values &&
      ((isArray && Array.isArray(values) && values.length > 0) ||
        (!isArray && values !== ""))
    ) {
      return (
        <div key={key} className="mb-2 mr-2">
          <div className="flex flex-wrap items-center justify-start gap-2">
            {isArray ? (
              (Array.isArray(values) ? values : [values]).flatMap(
                (value, index) =>
                  Array.isArray(value)
                    ? value.map(
                        (subValue, subIndex) =>
                          subValue && (
                            <button
                              key={`${key}-${index}-${subIndex}`}
                              className="min-w-[104px] h-[26px] flex items-center justify-between gap-1 px-[4px] py-[2px] text-xs text-[#8247E5] transition-all duration-300 border border-[#8247E5] rounded-sm hover:bg-gray-200"
                              onClick={() => handleRemoveFilter(key, subValue)}
                            >
                              <span className="text-[#8247E5] font-semibold text-[14px] leading-5">
                                {subValue}
                              </span>
                              <IoCloseCircle size={16} color="#8247E5" />
                            </button>
                          )
                      )
                    : value && (
                        <button
                          key={`${key}-${index}`}
                          className="min-w-[104px] h-[26px] flex items-center justify-between gap-1 px-[4px] py-[2px] text-xs text-[#8247E5] transition-all duration-300 border border-[#8247E5] rounded-sm hover:bg-gray-200"
                          onClick={() => handleRemoveFilter(key, value)}
                        >
                          <span className="text-[#8247E5] font-semibold text-[14px] leading-5">
                            {value}
                          </span>
                          <IoCloseCircle size={16} color="#8247E5" />
                        </button>
                      )
              )
            ) : (
              <button
                className="min-w-[104px] h-[26px] flex justify-between items-center gap-1 px-[4px] py-[2px] text-xs text-[#8247E5] transition-all duration-300 border border-[#8247E5] rounded-sm hover:bg-gray-200"
                onClick={() => handleRemoveFilter(key, values)}
              >
                <span className="text-[#8247E5] font-semibold text-[14px] leading-5">
                  {values}
                </span>
                <IoCloseCircle size={16} color="#8247E5" />
              </button>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-start gap-2">
        {filterConfig.map(renderFilterList)}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="from"
          value={selectedFilters?.floorFrom || ""}
          onChange={(e) =>
            setSelectedFilters({
              ...selectedFilters,
              floorFrom: parseInt(e.target.value) || "",
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
              floorTo: parseInt(e.target.value) || "",
            })
          }
          className="flex-1 p-2 border border-gray-300 bg-white rounded-md w-[85px] h-[35px]"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 mt-2 md:flex-row">
        <div className="relative">
          <input
            type="number"
            placeholder="from"
            value={selectedFilters?.areaFrom || ""}
            onChange={(e) =>
              setSelectedFilters({
                ...selectedFilters,
                areaFrom: parseInt(e.target.value) || "",
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
                areaTo: parseInt(e.target.value) || "",
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
  );
};

export default SelectedFilters;
