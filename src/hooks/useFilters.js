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
  const setComplex = (value) => setFilter("complex", value);
  const setAreaFrom = (value) => setFilter("area.from", value);
  const setAreaTo = (value) => setFilter("area.to", value);
  const setRenovation = (value) => setFilter("renovation", value);
  const setFloorFrom = (value) => setFilter("floor.from", value);
  const setFloorTo = (value) => setFilter("floor.to", value);
  const setCeilingHeight = (value) => setFilter("ceilingHeight", value);
  const setBathroom = (value) => setFilter("bathroom", value);
  const setFurniture = (value) => setFilter("furniture", value);
  const setRooms = (value) => setFilter("rooms.rooms", value);
  const setLivingRoom = (value) => setFilter("rooms.livingRoom", value);
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
