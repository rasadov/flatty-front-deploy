import { useState, forwardRef, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import classNames from "classnames";
import { XCircle } from "../assets/icons";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      className,
      value: propValue,
      onChange,
      status,
      showPasswordStrength,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState(propValue || "");
    const [passwordStrength, setPasswordStrength] = useState("");

    // Synchronize input value with propValue
    useEffect(() => {
      if (propValue !== undefined && propValue !== inputValue) {
        setInputValue(propValue);
      }
    }, [propValue]);

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      if (onChange) {
        onChange(e);
      }
      if (type === "password" && showPasswordStrength) {
        setPasswordStrength(checkPasswordStrength(newValue));
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const clearInput = (e) => {
      e.preventDefault();
      setInputValue("");
      if (onChange) {
        onChange({ target: { value: "" } });
      }
    };

    const checkPasswordStrength = (password) => {
      const weak = /^(?=.*[a-z]).{6,}$/;
      const medium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
      const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

      if (strong.test(password)) return "Strong";
      if (medium.test(password)) return "Medium";
      if (weak.test(password)) return "Weak";
      return "Very Weak";
    };

    return (
      <div className="relative">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type === "password" && showPassword ? "text" : type}
          className={classNames(
            "w-full px-4 py-[11px] rounded-[3px] bg-gray-100 text-gray-700 border focus:outline-none focus:ring-2",
            className,
            {
              "border-[#8247E5] focus:ring-[#8247E5]": status !== "error",
              "border-red-500": error,
            }
          )}
          value={inputValue}
          onChange={handleInputChange}
          {...props}
          style={{
            borderColor: status ? "#8247E5" : "#D1D5DB",
            lineHeight: "1.5", // This keeps the icons and text properly aligned
          }}
        />

        {/* Clear X icon, visible only when input is filled */}
        {inputValue && (
          <span
            className="absolute text-gray-600 transform -translate-y-1/2 cursor-pointer right-10 top-6 hover:text-gray-800 "
            onClick={clearInput}
          >
            <XCircle />
          </span>
        )}

        {/* Password visibility toggle icon */}
        {type === "password" && (
          <span
            className="absolute text-gray-600 transform -translate-y-1/2 cursor-pointer right-3 top-6 hover:text-gray-800"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size="24px" />
            ) : (
              <AiOutlineEye size="24px" />
            )}
          </span>
        )}

        {/* Error message */}
        {error && (
          <p className="mt-1 text-xs text-red-500">{error.message || "Xəta"}</p>
        )}

        {/* Password strength indicator */}
        {showPasswordStrength && type === "password" && inputValue && (
          <p
            className={`mt-1 text-xs ${
              passwordStrength === "Strong"
                ? "text-green-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {passwordStrength} password
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
