import React, { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

const Rating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating); // Rating state

  // Handle star click to change the rating
  const handleStarClick = useCallback(
    (newRating) => {
      const finalRating = newRating; // Update with exact user choice
      setRating(finalRating);
      if (onRatingChange) {
        onRatingChange(finalRating); // Notify parent of rating change
      }
    },
    [onRatingChange]
  );

  // Generate stars based on the current rating
  const renderStars = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;
      const isFullStar = starIndex <= Math.floor(rating); // Full stars
      const isHalfStar = starIndex === Math.ceil(rating) && rating % 1 !== 0; // Half stars

      return (
        <motion.span
          key={starIndex}
          onClick={() => handleStarClick(starIndex)}
          className={`cursor-pointer text-xl transition-colors duration-300 ${
            isFullStar
              ? "text-yellow-500"
              : isHalfStar
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          whileHover={{ scale: 1.2 }} // Hover Effect: enlarge star slightly
        >
          ★
        </motion.span>
      );
    });
  }, [rating, handleStarClick]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
      {renderStars}
    </div>
  );
};

export default Rating;
