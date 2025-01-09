import { motion } from "framer-motion";

export const ChooseUsCard = ({ imageSrc, title, description }) => {
  return (
    <motion.div
      className="p-4 transition-all rounded-md"
      whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-start mb-4">
        <img
          src={imageSrc}
          alt={title}
          className="object-cover w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] mr-3 sm:mr-5"
        />
      </div>
      <h3 className="mb-2 text-[20px] font-semibold sm:text-xl text-darkText leading-[32px]">
        {title}
      </h3>
      <p className="text-[18px]  text-black sm:w-[250px] md:w-80 font-normal leading-[28.8px]">
        {description}
      </p>
    </motion.div>
  );
};

export default ChooseUsCard;
