import { useDispatch, useSelector } from "react-redux";
import {
  setValue,
  toggleValue,
  incrementValue,
  decrementValue,
  clearAllFilters,
} from "../store/slices/filterSlice";

export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const setFilter = (path, value) => dispatch(setValue(path, value));
  const toggleFilter = (path) => dispatch(toggleValue(path));
  const incrementFilter = (path) => dispatch(incrementValue(path));
  const decrementFilter = (path) => dispatch(decrementValue(path));
  const clearFilters = () => dispatch(clearAllFilters());

  const setCategory = (value) => setFilter("category", value);
  const setAreaFrom = (value) => setFilter("areaFrom", value);
  const setAreaTo = (value) => setFilter("areaTo", value);
  const setMinFloor = (value) => setFilter("minFloor", value);
  const setMaxFloor = (value) => setFilter("maxFloor", value);
  const setBathroom = (value) => setFilter("bathrooms", value);
  const setBalconies = (value) => setFilter("balconies", value);

  const setLivingRoom = (value) => setFilter("", value);
  const setBedroom = (value) => setFilter("rooms.bedroom", value);
  const setBalcony = (value) => setFilter("rooms.balcony", value);
  const toggleParkingSlot = () => toggleFilter("parkingSlot");
  const toggleSwimmingPool = () => toggleFilter("swimmingPool");

  return {
    filters,
    setFilter,
    toggleFilter,
    incrementFilter,
    decrementFilter,
    clearFilters,
    setCategory,
    setComplex,
    setAreaFrom,
    setAreaTo,
    setRenovation,
    setFloorFrom,
    setFloorTo,
    setCeilingHeight,
    setBathroom,
    setFurniture,
    setRooms,
    setLivingRoom,
    setBedroom,
    setBalcony,
    toggleParkingSlot,
    toggleSwimmingPool,
  };
};
