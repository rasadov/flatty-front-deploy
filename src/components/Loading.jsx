import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  // Define the animation for the loading dots
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingDotVariants = {
    start: {
      y: "0%",
      opacity: 0,
    },
    end: {
      y: "100%",
      opacity: 1,
    },
  };

  const loadingDotTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        className="inline-flex space-x-1"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="w-3 h-3 bg-[#8247E5] rounded-full"
          variants={loadingDotVariants}
          transition={loadingDotTransition}
        />
        <motion.span
          className="w-3 h-3 bg-[#8247E5] rounded-full"
          variants={loadingDotVariants}
          transition={loadingDotTransition}
        />
        <motion.span
          className="w-3 h-3 bg-[#8247E5] rounded-full"
          variants={loadingDotVariants}
          transition={loadingDotTransition}
        />
      </motion.div>
    </div>
  );
};

export default Loading;
