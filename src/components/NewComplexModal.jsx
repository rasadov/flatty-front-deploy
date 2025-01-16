import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addPost, fetchPosts } from "../store/slices/agentPostSlice";
import { Add, Subtract, Active, Inactive } from "../assets/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const categories = [
  "Penthouse",
  "Villa",
  "Cottages"
];
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
  const apiKey = 'AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM'; // Replace with your Google Maps API key
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
    googleMapsApiKey: "AIzaSyCmyl8QRHQp6LHWfTDJrCX84NM1TJAC1fM", // Replace with your key
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

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setImages((prevFiles) => [...prevFiles, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleSubmit = async () => {
    if (images.length > 0) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      images.forEach((file, index) => {
        formDataToSend.append(`files`, file);
      });

      console.log("Form data to send:");
      console.log(formDataToSend);

      for (var pair of formDataToSend.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      try {
        const response = await axios.post(
          "https://flatty.abyssara.tech/api/v1/listing",
          formDataToSend,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Accept": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Response:", response.data);
        onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCustomToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const clearLocation = () => {
    setFormData((prev) => ({
      ...prev,
      address: "",
      latitude: null,
      longitude: null,
    }));
  };
  if (!isOpen) return null;

  
  const svgString = encodeURIComponent(`
    <svg width="36" height="46" viewBox="0 0 48 61" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.04448 7.06866C11.5083 2.58932 17.5604 0.069705 23.8731 0.0625C30.1858 0.069705 36.238 2.58932 40.7018 7.06866C45.1656 11.548 47.6766 17.6213 47.6838 23.9562C47.6837 34.1838 42.269 43.1668 36.7319 49.6787C31.1983 56.1864 25.5495 60.218 25.0856 60.5466C24.7263 60.7864 24.3045 60.9143 23.8731 60.9143C23.4417 60.9143 23.0199 60.7864 22.6607 60.5466C22.1968 60.218 16.5479 56.1864 11.0143 49.6787C5.47726 43.1668 0.0625121 34.1838 0.0625 23.9562C0.0696711 17.6213 2.58064 11.548 7.04448 7.06866ZM28.7309 16.661C27.293 15.6969 25.6025 15.1823 23.8731 15.1823C21.5541 15.1823 19.3301 16.1067 17.6904 17.7522C16.0506 19.3976 15.1295 21.6292 15.1295 23.9561C15.1295 25.6914 15.6423 27.3877 16.603 28.8305C17.5637 30.2733 18.9293 31.3979 20.527 32.062C22.1247 32.7261 23.8828 32.8999 25.579 32.5613C27.2751 32.2228 28.8331 31.3871 30.0559 30.1601C31.2787 28.933 32.1114 27.3697 32.4488 25.6678C32.7861 23.9659 32.613 22.2018 31.9512 20.5986C31.2895 18.9954 30.1688 17.6251 28.7309 16.661Z" fill="#6433C4" stroke="#220D6D" stroke-width="0.125"/>
    </svg>
    
      `);
      const svgIconUrl = `data:image/svg+xml,${svgString}`;
    

  return (
    <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    onClick={onClose}
  >
    <motion.div
      className="w-[690px] h-[600px] bg-white rounded-lg shadow-lg flex flex-col"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">New Post</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 font-semibold text-2xl"
        >
          &times;
        </button>
      </div>
        {step === 1 && (
          <div className="space-y-4 flex-1 overflow-y-auto px-6 py-4">
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
                  <option value="Appartment">Appartment</option>
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
                className="w-full h-[119px] p-2 border rounded-md"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="py-4">
            <div className="flex justify-center items-center">
                <div className="flex space-x-2">
                  <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
                  <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                  <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-4">
              <button
                className="px-4 w-[100px] py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => onClose()}
                >
                Previous
              </button>
              <button
                className="px-4 w-[100px] py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                onClick={() => setStep(2)}
                >
                Next
              </button>
              </div>
            </div>
          </div>
          
        )}
      {step === 2 && (
        <div className="flex flex-col justify-between h-full gap-4">
          {/* Content area */}
          <div className="space-y-6 flex-1 overflow-y-auto px-6 py-4">
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold">Upload photos</h3>
            </div>

            {/* Drag and Drop Area or Click to Browse */}
            <div 
            className="flex flex-col justify-center gap-3 border-2 border-dashed h-[46%] border-gray-300 rounded-lg p-6 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
              <p className="text-sm text-gray-600 mb-4">
                Drag photos here to start uploading
              </p>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md w-[200px] mx-auto"
                onClick={() =>
                  document.querySelector('input[type="file"]')?.click()
                }
              >
                Browse Files
              </button>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              // Make it horizontally scrollable instead of wrapping
              <div className="mt-4 flex overflow-x-auto space-x-4">
                {images.map((file, index) => {
                  const previewUrl = URL.createObjectURL(file);

                  return (
                    // Center the media within this container
                    <div
                      key={index}
                      className="relative min-w-[160px] h-[120px] border rounded-md bg-gray-50 
                                overflow-hidden flex items-center justify-center"
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="max-w-full max-h-full object-cover"
                        />
                      ) : (
                        <video
                          src={previewUrl}
                          className="max-w-full max-h-full object-cover"
                          controls
                        />
                      )}

                      {/* Delete button */}
                      <button
                        className="absolute top-2 right-2 w-6 h-6 bg-white text-gray-700 
                                  rounded-full flex items-center justify-center text-xs 
                                  hover:bg-red-600 hover:text-white transition-colors"
                        onClick={() => handleImageRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer / Pagination Controls */}
          <div className="py-4">
            <div className="flex justify-center items-center">
              <div className="flex space-x-2">
                {/* For the "dots" at the bottom */}
                <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
                <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
                <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4">
              <button
                className="px-4 w-[100px] py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => setStep(1)}
              >
                Previous
              </button>
              <button
                className="px-4 w-[100px] py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                onClick={() => setStep(3)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
{step === 3 && (
  <div className="flex-1 overflow-y-auto px-6 py-4">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold">Choose location</h3>
      {/* <button
        onClick={clearLocation} // Optional clear button
        className="text-purple-600 hover:text-purple-800"
      >
        ×
      </button> */}
    </div>

    {/* Map and Address */}
    <div className="space-y-4">
      {/* Address */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-md">
        <p className="text-sm text-gray-700">
          {formData.address || "Select a location on the map"}
        </p>
        {formData.address && (
          <button
            onClick={clearLocation}
            className="text-purple-600 hover:text-purple-800"
          >
            ×
          </button>
        )}
      </div>

      {/* Map */}
      {isLoaded && (
        <div className="w-full h-[300px] rounded-lg overflow-hidden border">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
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
                icon={svgIconUrl}
              />
            )}
          </GoogleMap>
        </div>
      )}
    </div>

    {/* Pagination and Buttons */}
    <div className="flex justify-center items-center mt-4">
        <div className="flex space-x-2">
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
          <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-4">
      <button
        className="px-4 w-[100px] py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        onClick={() => setStep(2)}
        >
        Previous
      </button>
      <button
        className="px-4 w-[100px] py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
        onClick={() => handleSubmit()}
        >
        Next
      </button>
    </div>
  </div>
)}
      </motion.div>
    </div>
  );
};

export default NewComplexModal;