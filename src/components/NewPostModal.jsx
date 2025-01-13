import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addPost, fetchPosts } from "../store/slices/agentPostSlice";
import { Add, Subtract, Active, Inactive } from "../assets/icons";

const categories = ["Apartment", "Other"];
const conditions = [
  "Without finishing",
  "Pre-finish",
  "Move-in ready",
  "With furniture",
];
const renovations = [
  "Cosmetic",
  "Designer",
  "European style",
  "Needs renovation",
];

const NewPostModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    residentialComplex: "",
    floor: "",
    totalArea: "",
    livingArea: "",
    description: "",
    rooms: 0,
    bathrooms: 0,
    livingRooms: 0,
    bedrooms: 0,
    balconies: 0,
    parkingSlots: false,
    bathroom1: "",
    bathroom2: "",
    condition: conditions[0],
    renovation: renovations[0],
  });
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, operation) => {
    setFormData((prev) => ({
      ...prev,
      [name]:
        operation === "add" ? prev[name] + 1 : Math.max(0, prev[name] - 1),
    }));
  };

  const handleParkingToggle = () => {
    setFormData((prev) => ({ ...prev, parkingSlots: !prev.parkingSlots }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = async () => {
    if (images.length > 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      images.forEach((file, index) => {
        formDataToSend.append(`files[${index}]`, file);
      });

      for (var pair of formDataToSend.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        await dispatch(addPost(formDataToSend));
        dispatch(fetchPosts());
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getButtonStyle = (category, value) => {
    const isSelected = Array.isArray(formData[category])
      ? formData[category].includes(value)
      : formData[category] === value;
    return `px-4 py-2 text-xs font-semibold border text-[#525C76] h-[35px] rounded-sm transition-all duration-300 ease-in-out transform ${
      isSelected
        ? " border-[#8247E5] outline outline-2 outline-[#DCD4FF] scale-105"
        : "border-[#E2E4E8] hover:border-[#8247E5] hover:bg-[#F0F0F5]"
    }`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="w-[628px] h-[506px] p-6 bg-white rounded-lg overflow-y-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Fill Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  className="w-[277px] h-[52px] p-2 border rounded-md"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Name of residential complex
                </label>
                <select
                  name="residentialComplex"
                  className="w-[277px] h-[52px] p-2 border rounded-md"
                  value={formData.residentialComplex}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {/* Add options dynamically or statically */}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Floor
                </label>
                <input
                  name="floor"
                  type="number"
                  className="w-[106px] h-[52px] p-2 border rounded-md"
                  value={formData.floor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Floors in Building
                </label>
                <input
                  name="floors"
                  type="number"
                  className="w-[106px] h-[52px] p-2 border rounded-md"
                  value={formData.floor}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Total area (m²)
                </label>
                <input
                  name="totalArea"
                  type="number"
                  className="w-[106px] h-[52px] p-2 border rounded-md"
                  value={formData.totalArea}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Living area (m²)
                </label>
                <input
                  name="livingArea"
                  type="number"
                  className="w-[106px] h-[52px] p-2 border rounded-md"
                  value={formData.livingArea}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  className="w-[106px] h-[52px] p-2 border rounded-md"
                  value={formData.livingArea}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="w-[570px] h-[119px] p-2 border rounded-md"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["rooms", "bathrooms", "livingRooms", "bedrooms"].map(
                (field, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                      {field == "livingRooms" ? "Living rooms" : field}
                    </label>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleNumberChange(field, "subtract")}
                      >
                        <Subtract />
                      </button>
                      <input
                        name={field}
                        type="number"
                        className="w-[52px] h-[32px] p-2 border rounded-md text-center"
                        value={formData[field]}
                        onChange={handleInputChange}
                        min="0"
                        readOnly
                      />
                      <button onClick={() => handleNumberChange(field, "add")}>
                        <Add />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Balcony
              </label>
              <button
                onClick={() => handleNumberChange("balconies", "subtract")}
              >
                <Subtract />
              </button>
              <input
                name="balconies"
                type="number"
                className="w-[52px] h-[32px] p-2 border rounded-md text-center"
                value={formData.balconies}
                onChange={handleInputChange}
                min="0"
                readOnly
              />
              <button onClick={() => handleNumberChange("balconies", "add")}>
                <Add />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Parking slot
              </label>
              <button onClick={handleParkingToggle}>
                {formData.parkingSlots ? <Active /> : <Inactive />}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Bathroom 1
                </label>
                <select
                  name="bathroom1"
                  className="w-[277px] h-[52px] p-2 border rounded-md"
                  value={formData.bathroom1}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {/* Add options dynamically or statically */}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Bathroom 2
                </label>
                <select
                  name="bathroom2"
                  className="w-[277px] h-[52px] p-2 border rounded-md"
                  value={formData.bathroom2}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  {/* Add options dynamically or statically */}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Condition
              </label>
              <div className="flex flex-wrap gap-2">
                {conditions.map((condition, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, condition: condition }))
                    }
                    className={getButtonStyle("condition", condition)}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Renovation
              </label>
              <div className="flex flex-wrap gap-2">
                {renovations.map((renovation, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        renovation: renovation,
                      }))
                    }
                    className={getButtonStyle("renovation", renovation)}
                  >
                    {renovation}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md"
                // onClick={() => setStep(0)} // Assuming 0 would close or go back to the previous step outside this component
              >
                Previous
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          // Image upload step (as previously defined)
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Upload Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md"
                onClick={() => setStep(1)}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
                onClick={handleSubmit}
                disabled={images.length === 0}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NewPostModal;
