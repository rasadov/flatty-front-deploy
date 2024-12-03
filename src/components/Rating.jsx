import React, { useState, useMemo, useCallback, useRef } from "react";

const Rating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);
  const isHovering = useRef(false);

  const handleStarClick = useCallback(
    (event, starIndex) => {
      const { left, width } = event.target.getBoundingClientRect();
      const clickPosition = event.clientX - left;
      const fraction = clickPosition / width;
      const newRating = starIndex - 1 + fraction;

      if (newRating.toFixed(1) === rating.toFixed(1)) return;

      setRating(newRating);
      if (onRatingChange) {
        onRatingChange(newRating.toFixed(1));
      }
    },
    [rating, onRatingChange]
  );

  const handleStarHover = useCallback((event, starIndex) => {
    if (!isHovering.current) return;
    const { left, width } = event.target.getBoundingClientRect();
    const hoverPosition = event.clientX - left;
    const fraction = hoverPosition / width;
    const hoverValue = starIndex - 1 + fraction;
    setHoverRating(hoverValue);
  }, []);

  const startHover = useCallback(() => {
    isHovering.current = true;
  }, []);

  const resetHover = useCallback(() => {
    isHovering.current = false;
    setHoverRating(null);
  }, []);

  const renderStars = useMemo(() => {
    const displayRating = hoverRating ?? rating;

    return Array.from({ length: 5 }, (_, i) => {
      const starIndex = i + 1;
      const isPartialStar =
        starIndex === Math.ceil(displayRating) && displayRating % 1 !== 0;
      const widthPercentage = isPartialStar
        ? `${(displayRating % 1) * 100}%`
        : displayRating >= starIndex
        ? "100%"
        : "0%";

      return (
        <div
          key={starIndex}
          onMouseMove={(e) => handleStarHover(e, starIndex)}
          onMouseEnter={startHover}
          onMouseLeave={resetHover}
          onClick={(e) => handleStarClick(e, starIndex)}
          className="relative inline-block cursor-pointer"
        >
          {/* Sarı hissə */}
          <div
            className="absolute top-0 left-0 w-full overflow-hidden"
            style={{ width: widthPercentage }}
          >
            <span className="text-xl text-yellow-500">★</span>
          </div>
          {/* Boz rəngdə default ulduz */}
          <span className="text-xl text-gray-300">★</span>
        </div>
      );
    });
  }, [
    rating,
    hoverRating,
    handleStarClick,
    handleStarHover,
    resetHover,
    startHover,
  ]);

  return (
    <div className="flex items-center gap-2">
      <span className="ml-2 text-sm font-medium text-gray-700">
        {(hoverRating ?? rating).toFixed(1)}
      </span>
      {renderStars}
    </div>
  );
};

export default Rating;
