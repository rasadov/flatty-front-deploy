import React from "react";
import { FooterLogo } from "../assets/icons/FooterLogo";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "../assets/icons";
import { motion } from "framer-motion";

export const Footer = () => {
  const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className="py-12 mx-auto bg-secondaryBg container-fluid"
    >
      {/* Logo Section */}
      <motion.div
        variants={fadeInVariant}
        className="mb-8 text-center sm:text-left"
      >
        <FooterLogo />
      </motion.div>
      <hr className="my-8 text-black border-b-2" />

      {/* Grid Columns */}
      <div className="grid grid-cols-1 text-center gap-y-8 sm:grid-cols-2 lg:grid-cols-4 sm:text-left">
        {/* COLUMN ONE */}
        <motion.div variants={fadeInVariant}>
          <h3 className="mb-2 text-lg font-bold text-darkText ">Company</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Blog
              </a>
            </li>
          </ul>
        </motion.div>

        {/* COLUMN TWO */}
        <motion.div variants={fadeInVariant}>
          <h3 className="mb-2 text-lg font-bold text-darkText ">Support</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Safety Center
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                FAQs
              </a>
            </li>
          </ul>
        </motion.div>

        {/* COLUMN THREE */}
        <motion.div variants={fadeInVariant}>
          <h3 className="mb-2 text-lg font-bold text-darkText ">Legal</h3>
          <ul className="mt-2 space-y-1">
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Security
              </a>
            </li>
          </ul>
        </motion.div>

        {/* COLUMN FOUR */}
        <motion.div variants={fadeInVariant}>
          <h3 className="mb-2 text-lg font-bold text-darkText ">Social</h3>
          <ul className="my-6 space-y-3">
            <li>
              <a href="#" className="text-darkText hover:text-hoverPrimary">
                Join Us
              </a>
            </li>
            <div className="flex justify-center mt-4 space-x-4 sm:justify-start">
              {[
                { icon: <YoutubeIcon />, label: "Youtube" },
                { icon: <FacebookIcon />, label: "Facebook" },
                { icon: <TwitterIcon />, label: "Twitter" },
                { icon: <InstagramIcon />, label: "Instagram" },
                { icon: <LinkedinIcon />, label: "LinkedIn" },
              ].map(({ icon, label }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={label}
                  className="text-darkText hover:text-hoverPrimary"
                  whileHover={{ scale: 1.1 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </ul>
        </motion.div>
      </div>

      <hr className="my-8 text-black border-b-2" />

      {/* Footer Bottom Section */}
      <motion.div
        variants={fadeInVariant}
        className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0"
      >
        <p className="text-sm text-center text-gray-400 sm:text-left">
          Flatty &copy; 2024. All rights reserved.
        </p>
        <div className="flex space-x-4">
          {["Home", "Services", "Blog", "Help Center", "About"].map(
            (item, idx) => (
              <a
                key={idx}
                href="#"
                className="text-darkText hover:text-hoverPrimary"
              >
                {item}
              </a>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
