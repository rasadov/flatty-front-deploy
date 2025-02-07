import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button";
import {
  FilterSelect,
  FilterButtonGroup,
  FilterNumberRange,
  FilterSingleNumber,
  FilterToggle,
  FilterButtonToggle,
} from "../../modules/FilterModalModules";
import { Add, Subtract } from "../../assets/icons";
import { useSearchParams } from "react-router-dom";
import { ArrowDown } from "../../assets/icons";

export const FilterModal = ({ isOpen, onClose, onApply, complexes }) => {
  const categories = ["Penthouse", "Villa", "Cottages"];
  const livingRoomses = [1, 2, 3, 4, 5];
  const furnitures = ["true", "false"];
  const balconie = [1, 2, 3, 4, 5];
  const bedrooms = [1, 2, 3];
  const bathrooms = [1, 2, 3];
  const parkingSlot = ["true", "false"];
  const swimmingPool = ["true", "false"];
  const gym = ["true", "false"];
  const elevator = ["true", "false"];

  const [searchParams, setSearchParams] = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
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
    furniture: null,
  });

  const handleSelect = (name, value) => {
    setSelectedFilters({ ...selectedFilters, [name]: value });
    setOpenDropdown(null);
  };

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
      furniture: null,
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
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="fixed z-50 flex items-center justify-center inset-0 p-4 md:p-0">
        <motion.div
          className="bg-white w-full md:rounded-lg md:max-w-[938px] min-h-screen md:min-h-0 md:h-[786px] overflow-auto p-4 md:p-6 relative"
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
          {/* <FilterNumberRange
            label="Area (m²)"
            category="areaFrom"
            fromKey="areaFrom"
            toKey="areaTo"
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            updateFilterValue={updateFilterValue}
            unit="m²"
          /> */}

          <div className="flex flex-col gap-4">
            {/* =========================== CATEGORY SELECT ========================== */}
            <div className="relative flex gap-4">
              <div className="w-2/5 pt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
              </div>
              <div className="w-3/5 relative">
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "category" ? null : "category"
                    )
                  }
                >
                  {selectedFilters.category || "Choose Category"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "category" && (
                  <ul className="absolute w-[200px] bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("category", "Appartment")}
                    >
                      Appartment
                    </li>
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("category", category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* =========================== RESIDENTIAL COMPLEX SELECT  ========================== */}

            <div className="relative flex gap-4">
              <div className="w-2/5 pt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Residens Complex
                </label>
              </div>

              <div className="w-3/5 relative">
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "residentialComplex"
                        ? null
                        : "residentialComplex"
                    )
                  }
                >
                  {selectedFilters.residentialComplex || "Choose Complex"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "residentialComplex" && (
                  <ul className="absolute w-[200px] bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    {
                      (complexes = "Could not validate credentials" ? (
                        <li
                          className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                          onClick={() => handleSelect("residentialComplex", "")}
                        >
                          Select
                        </li>
                      ) : (
                        complexes.map((complex, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                            onClick={() =>
                              handleSelect("residentialComplex", complex)
                            }
                          >
                            {complex}
                          </li>
                        ))
                      ))
                    }
                  </ul>
                )}
              </div>
            </div>

            {/* =========================== Installment ========================== */}

            <div className="relative flex gap-4">
              <div className="w-2/5 pt-2">
                <label className="block text-sm font-medium text-gray-700">
                  Installment
                </label>
              </div>

              <div className="w-3/5 relative">
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "installment" ? null : "installment"
                    )
                  }
                >
                  {selectedFilters.installment || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "installment" && (
                  <ul className="absolute w-[200px] bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    {
                      (complexes = "Could not validate credentials" ? (
                        <li
                          className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                          onClick={() => handleSelect("installment", "")}
                        >
                          Select
                        </li>
                      ) : (
                        complexes.map((complex, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                            onClick={() =>
                              handleSelect("installment", installment)
                            }
                          >
                            {complex}
                          </li>
                        ))
                      ))
                    }
                  </ul>
                )}
              </div>
            </div>

            <FilterSingleNumber
              label="Price"
              category="price"
              placeholderMin="Min"
              placeholderMax="Max"
              categoryMin="priceRangeMin"
              categoryMax="priceRangeMax"
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
            />
            <FilterSingleNumber
              label="Total Area (m²)"
              category="area"
              placeholderMin="From (m²)"
              placeholderMax="To (m²)"
              categoryMin="areaFrom"
              categoryMax="areaTo"
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
            />
            <FilterSingleNumber
              label="Living Area (m²)"
              category="livingArea"
              placeholderMin="From"
              placeholderMax="To"
              categoryMin="livingAreaFrom"
              categoryMax="livingAreaTo"
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
            />
            <FilterSingleNumber
              label="Floor"
              category="floor"
              placeholderMin="from"
              placeholderMax="to"
              categoryMin="minFloor"
              categoryMax="maxFloor"
              children={
                <>
                  <FilterButtonToggle
                    // label="Floor"
                    placeholder="Not first"
                    category="notFirstFloor"
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                  />
                  <FilterButtonToggle
                    // label="Floor"
                    placeholder="Not last"
                    category="notLastFloor"
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                  />
                  <FilterButtonToggle
                    // label="Floor"
                    placeholder="Last"
                    category="lastFloor"
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                  />
                </>
              }
              setSelectedFilters={setSelectedFilters}
              selectedFilters={selectedFilters}
            />

            {/* =========================== Living Rooms ========================== */}
            <div className="flex gap-4 mb-2">
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Living room
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "livingRooms1" ? null : "livingRooms1"
                    )
                  }
                >
                  {selectedFilters.livingRooms || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "livingRooms1" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("livingRooms", "")}
                    >
                      Select
                    </li>
                    {livingRoomses.map((rooms, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("livingRooms", rooms)}
                      >
                        {rooms}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Furniture
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "furniture" ? null : "furniture"
                    )
                  }
                >
                  {selectedFilters.furniture || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "furniture" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("furniture", "")}
                    >
                      Select
                    </li>
                    {furnitures.map((furniture, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("furniture,", furniture)}
                      >
                        {furniture}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ======================   Balconies ========================= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Balconies
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "balconies" ? null : "balconies"
                    )
                  }
                >
                  {selectedFilters.balconies || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "balconies" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("balconies", "")}
                    >
                      Select
                    </li>
                    {balconie.map((balconies, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("balconies", balconies)}
                      >
                        {balconies}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ======================   bedrooms ========================= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Bedrooms
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "bedrooms" ? null : "bedrooms"
                    )
                  }
                >
                  {selectedFilters.bedrooms || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "bedrooms" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("bedrooms", "")}
                    >
                      Select
                    </li>
                    {bedrooms.map((bedrooms, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("balconies", bedrooms)}
                      >
                        {bedrooms}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ======================   bedrooms ========================= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "bathrooms" ? null : "bathrooms"
                    )
                  }
                >
                  {selectedFilters.bedrooms || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "bathrooms" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("bathrooms", "")}
                    >
                      Select
                    </li>
                    {bathrooms.map((bathrooms, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("balconies", bathrooms)}
                      >
                        {bathrooms}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* =========================== GYM PARKING SWIMING POOL ELEVATOR ========================== */}
            <div className="flex gap-4 mb-4">
              {/*  ========== parkingSlot =============== */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Parking
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "parkingSlot" ? null : "parkingSlot"
                    )
                  }
                >
                  {selectedFilters.parkingSlot || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "parkingSlot" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("parkingSlot", "")}
                    >
                      Select
                    </li>
                    {parkingSlot.map((parkingSlot, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("parkingSlot", parkingSlot)}
                      >
                        {parkingSlot}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/*  ============= swimmingPool ========= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Swimming Pool
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "swimmingPool" ? null : "swimmingPool"
                    )
                  }
                >
                  {selectedFilters.swimmingPool || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "swimmingPool" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("swimmingPool", "")}
                    >
                      Select
                    </li>
                    {swimmingPool.map((swimmingPool, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() =>
                          handleSelect("swimmingPool,", swimmingPool)
                        }
                      >
                        {swimmingPool}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ======================   GYM ========================= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  GYM
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "gym" ? null : "gym")
                  }
                >
                  {selectedFilters.gym || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "gym" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("gym", "")}
                    >
                      Select
                    </li>
                    {gym.map((gym, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("gym", gym)}
                      >
                        {gym}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* ======================   Elevator ========================= */}
              <div className="w-1/2 relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Elevator
                </label>
                <button
                  type="button"
                  className="w-full h-[46px] p-2 border rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[rgba(130,71,229,1)] flex items-center justify-between"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "elevator" ? null : "elevator"
                    )
                  }
                >
                  {selectedFilters.elevator || "Select"}
                  <ArrowDown className="w-5 h-5 text-gray-500" />
                </button>

                {openDropdown === "elevator" && (
                  <ul className="absolute w-full bg-white border rounded-md shadow-md mt-1 z-10 max-h-48 overflow-y-auto animate-fade-in">
                    <li
                      className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                      onClick={() => handleSelect("elevator", "")}
                    >
                      Select
                    </li>
                    {elevator.map((elevator, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-[rgba(220,212,255,1)] transition"
                        onClick={() => handleSelect("elevator", elevator)}
                      >
                        {elevator}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleApply}
              className="bg-[#8247E5] text-white px-4 py-2 rounded"
              style={{
                borderRadius: "3px",
                border: "1px solid rgba(166, 115, 239, 1)",
                fontSize: "18px",
                fontWeight: "600",
                width: "110px",
              }}
            >
              Clear
            </Button>
            <Button
              onClick={handleApply}
              className="bg-[#8247E5] text-white px-4 py-2 rounded"
              style={{
                borderRadius: "3px",
                border: "1px solid rgba(166, 115, 239, 1)",
                fontSize: "18px",
                fontWeight: "600",
                width: "110px",
              }}
            >
              Apply
            </Button>
            <Button
              variant="cancel"
              onClick={handleCancel}
              style={{
                borderRadius: "3px",
                border: "1px solid #8247E5",
                background: "rgba(255, 255, 255, 1)",
                color: "#8247E5",
                fontSize: "18px",
                fontWeight: "600",
                width: "110px",
              }}
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
