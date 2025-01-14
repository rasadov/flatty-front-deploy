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

const NewComplexModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    residentialComplex: "",
    description: "",
    
    buildingArea: 0,
    livingArea: 0,
    objects: 0,
    year: 0,
    buildingFloors: 0,    

    parkingSlot: false,
    installment: false,
    swimmingPool: false,
    elevator: false,
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
        className="w-[628px] h-[506px] p-6 bg-white rounded-lg overflow-y-auto"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Complex</h2>
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
                  Name of residential complex
                </label>
                <input
                    name="residentialComplex"
                    type="text"
                    className="w-[277px] h-[52px] p-2 border rounded-md"
                    value={formData.residentialComplex}
                    onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  className="w-[277px] h-[52px] p-2 border rounded-md bg-gray-100"
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
            </div>
            {/* Row snippet: Building area, Living area, Objects, Floors, Year */}
            <div className="flex gap-4 items-center justify-between">
            {/* Building Area */}
            <div className="w-[100%]">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Building area
                </label>
                <div className="relative">
                <input
                    type="number"
                    className="w-[100%] p-2 border rounded-md"
                    placeholder="45"
                />
                <span className="absolute right-3 top-2 text-gray-500">m²</span>
                </div>
            </div>

            {/* Living Area */}
            <div className="w-[100%]">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Living area
                </label>
                <div className="relative">
                <input
                    type="number"
                    className="w-[100%] p-2 border rounded-md"
                    placeholder="38"
                />
                <span className="absolute right-3 top-2 text-gray-500">m²</span>
                </div>
            </div>

            {/* Objects */}
            <div className="w-[100%]">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Objects
                </label>
                <input
                type="number"
                className="w-[100%] p-2 border rounded-md"
                placeholder="38"
                />
            </div>

            {/* Floors */}
            <div className="w-[40%]">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Floors
                </label>
                <input
                type="number"
                className="w-[100%] p-2 border rounded-md"
                placeholder="16"
                />
            </div>

            {/* Year */}
            <div className="w-[60%]">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                Year
                </label>
                <input
                type="number"
                className="w-[100%] p-2 border rounded-md"
                placeholder="2020"
                />
            </div>
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
            <div className="flex justify-end mt-4">
              {/* <button
                className="px-4 py-2 text-white bg-gray-500 rounded-md"
                // onClick={() => setStep(0)} // Assuming 0 would close or go back to the previous step outside this component
              >
                Previous
              </button> */}
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

export default NewComplexModal;