import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addPost, fetchPosts } from "../store/slices/agentPostSlice";
import { Add, Subtract, Active, Inactive } from "../assets/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const categories = ["Apartment", "Other"];
const conditions = [
  "Without finishing",
  "Pre-finish",
  "Move-in ready",
  "With furniture",
  "Cosmetic",
  "Designer",
  "European style",
  "Needs renovation",
];
const renovations = [
  "Cosmetic",
  "Designer",
  "European style",
  "Needs renovation",
];

const getAddressFromLatLng = async (lat, lng) => {
  const apiKey = 'GoogleAPI'; // Replace with your Google Maps API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      const address = response.data.results[0].formatted_address;
      console.log('Fetched address: ', address);
      return address;
    } else {
      throw new Error('Unable to fetch address');
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

const NewPostModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    residentialComplex: "",
    floor: "",
    totalArea: 0,
    livingArea: 0,
    description: "",
    currency: "$",
    bathroom: 0,
    livingRoom: 0,
    bedroom: 0,
    balcony: 0,
    parkingSlot: false,
    installment: false,
    swimmingPool: false,
    elevator: false,
    appartmentStories: 0,
    floor: 0,
    year: 0,
    buildingFloors: 0,    
    condition: conditions[0],
    latitude: 0,
    longitude: 0,
    address: "",
  });
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const mapRef = useRef(null);

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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "GoogleAPI", // Replace with your key
    libraries: ["places"],
  });

  const handleMapClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const address = await getAddressFromLatLng(lat, lng);


    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address: address,
    }));
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

      console.log("Form data to send:");
      console.log(formDataToSend);

      for (var pair of formDataToSend.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        dispatch(addPost(formDataToSend));
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

  const handleCustomToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="w-[690px] h-[506px] p-6 bg-white rounded-lg overflow-y-auto"
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
                  className="w-[277px] h-[46px] p-2 border rounded-md bg-gray-100"
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
                  className="w-[277px] h-[46px] p-2 border rounded-md bg-gray-100"
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
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-start mt-4">
              {["floor", "appartmentStories", "buildingFloors", "livingRoom", "bedroom", "bathroom", "balcony"].map(
                (field, index) => (
                  <div key={index} className="flex items-center gap-1 mx-auto my-3">
                    <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                      {field == "livingRooms" ? "Living rooms":
                       field == "buildingFloors" ? "Building floors":
                       field == "appartmentStories" ? "Appartment stories": field}
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
                        className="w-[36px] h-[32px] border rounded-md text-center"
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
            <div className="flex flex-wrap gap-2 items-center justify-start mt-4">
            {["parkingSlot", "installment", "swimmingPool", "elevator"].map(
              (field, index) => (
                <div key={index} className="flex items-center gap-1 mx-auto my-3">
                  <label className="block mb-1 text-sm font-medium text-gray-700 capitalize">
                    {field === "parkingSlot" ? "Parking slot" :
                    field === "installment" ? "Installment" :
                    field === "swimmingPool" ? "Swimming pool" :
                    field === "elevator" ? "Elevator" : field}
                  </label>
                  <div className="flex items-center">
                    <button onClick={() => handleCustomToggle(field)}>
                      {formData[field] ? <Active /> : <Inactive />}
                    </button>
                  </div>
                </div>
              )
            )}
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
                    className={getButtonStyle("condition", condition) + " bg-gray-100"}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-start gap-4 mt-4">
              <div className="flex flex-col items-left gap-2">
                  <div 
                  style={{
                    textAlign: "left",
                  }}>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Year
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      name="year"
                      type="number"
                      className="w-[76px] h-[52px] p-2 border rounded-md"
                      value={formData.year}
                      onChange={handleInputChange}
                      />
                  </div>
              </div>
              <div className="flex flex-col items-left gap-2">
                  <div 
                  style={{
                    textAlign: "left",
                  }}>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Price
                    </label>
                  </div>
                  <div className="flex gap-1">
                    <input
                      name="price"
                      type="number"
                      className="w-[106px] h-[52px] p-2 border rounded-md"
                      value={formData.price}
                      onChange={handleInputChange}
                      />
                    <select
                      name="category"
                      className="h-[52px] p-2 border rounded-md bg-gray-100"
                      value={formData.category}
                      onChange={handleInputChange}
                      >
                      <option value="$">$</option>
                      <option value="€">€</option>
                      <option value="₺">₺</option>
                      <option value="£">£</option>
                    </select>
                  </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                className="w-full h-[119px] p-2 border rounded-md"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              />
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
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
        <div>
          <h2>Select Location</h2>
          {isLoaded && (
            <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{ lat: 35.198284, lng: 33.355869 }} // North Cyprus coordinates
            zoom={12}
            onClick={handleMapClick}
            ref={mapRef}
            >
              {formData.latitude && formData.longitude && (
                <Marker
                  position={{
                    lat: formData.latitude,
                    lng: formData.longitude,
                  }}
                />
              )}
            </GoogleMap>
          )}
          <div>
            <p>Address: {formData.address}</p>
            <p>Latitude: {formData.latitude}</p>
            <p>Longitude: {formData.longitude}</p>
          </div>
          <div className="flex justify-between">

          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md"
            onClick={() => setStep(2)}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-md"
            onClick={handleSubmit}
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
