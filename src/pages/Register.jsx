// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const passwordStrength = (password) => {
  const regexWeak = /^(?=.*[a-z]).{6,}$/;
  const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (regexStrong.test(password)) return "Strong";
  if (regexMedium.test(password)) return "Medium";
  if (regexWeak.test(password)) return "Weak";
  return "Very Weak";
};

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: new Date(),
    phoneNumber: "",
  });
  const [passwordStrengthLevel, setPasswordStrengthLevel] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "password") {
      setPasswordStrengthLevel(passwordStrength(value));
    }

    if (name === "confirmPassword") {
      setIsPasswordMatch(value === formData.password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordMatch) {
      // Simulating a successful registration
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 1000);
    } else {
      alert("Passwords do not match");
    }
  };

  const getPasswordClasses = () => {
    switch (passwordStrengthLevel) {
      case "Strong":
        return "border-green-500 bg-green-50";
      case "Medium":
        return "border-yellow-500 bg-yellow-50";
      case "Weak":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-6 animate__animated animate__fadeIn">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`mt-2 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${getPasswordClasses()} transition duration-300 ease-in-out`}
              required
            />
            <div
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </div>
          </div>
          <div
            className={`mt-2 text-sm font-medium ${
              passwordStrengthLevel === "Strong"
                ? "text-green-500"
                : passwordStrengthLevel === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {passwordStrengthLevel &&
              `Password Strength: ${passwordStrengthLevel}`}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`mt-2 w-full px-4 py-2 ${
              !isPasswordMatch ? "border-red-500" : "border-gray-300"
            } bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
            required
          />
          {!isPasswordMatch && (
            <p className="text-red-500 text-xs">Passwords do not match</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <div className="flex space-x-4">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block text-sm font-medium text-gray-700"
          >
            Birth Date
          </label>
          <DatePicker
            selected={formData.birthDate}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
            className="mt-2 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="MM/dd/yyyy"
          />
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <PhoneInput
            international
            defaultCountry="US"
            value={formData.phoneNumber}
            onChange={(value) =>
              setFormData({ ...formData, phoneNumber: value })
            }
            className="mt-2 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
