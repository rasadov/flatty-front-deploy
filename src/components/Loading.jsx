import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      {/* Semi-transparent Background */}

      <motion.div
        className="relative z-10 w-32 h-32" // Larger spinner
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.5, // Slightly slower rotation for elegance
          ease: "linear",
        }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static Background Circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="#4A5568" // Darker gray stroke for subtle contrast
            strokeWidth="6"
          />
          {/* Rotating Foreground Circle */}
          <motion.circle
            cx="25"
            cy="25"
            r="20"
            stroke="#8247E5" // Primary color
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="94.2" // Full circumference divided into visible parts
            strokeDashoffset="0"
            animate={{ strokeDashoffset: [-94.2, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5, // Matches container animation duration
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default Loading;
