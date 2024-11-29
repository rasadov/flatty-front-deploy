import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { LogoDesktop } from "../assets/icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Optimizing the toggle function by memoizing it using useCallback
  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState);
  }, []);

  // Function to navigate to a different page
  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const navLinks = [
    { to: "/agents", label: "Agents" },
    { to: "/agencies", label: "Agencies" },
    { to: "/about", label: "About us" },
    { to: "/contacts", label: "Contacts" },
  ];

  const renderNavLinks = useCallback(() => {
    return navLinks.map(({ to, label }) => (
      <Link key={to} to={to} className="py-2 transition hover:text-[#A673EF]">
        {label}
      </Link>
    ));
  }, []);

  return (
    <header className="bg-[#F9F8FF] border-b-2 px-8 py-[14.5px] container-fluid z-50 relative">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <LogoDesktop className="w-[120px] md:w-[180px]" />
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="block md:hidden p-2 rounded-full bg-[#F9F8FF] shadow-md focus:outline-none transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle navigation"
        >
          <motion.div
            className="relative w-8 h-8"
            initial={{ rotate: 0 }}
            animate={{ rotate: menuOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`absolute w-8 h-0.5 bg-black transition-all duration-300 ease-in-out transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </motion.div>
        </button>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-[#220D6D] text-[16px]">
          {renderNavLinks()}
        </div>

        {/* Button Section (Desktop) */}
        <div className="items-center hidden gap-6 md:flex">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleNavigation("/login")}
            className="px-[18.6px] py-[9.5px] transition-all duration-300 hover:bg-[#A673EF] hover:text-white border rounded-sm"
          >
            Log in
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={() => handleNavigation("/register")}
            className="px-[14.2px] py-[10.5px] transition-all duration-300 hover:bg-hoverPrimary hover:text-white border rounded-sm"
          >
            Sign up
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className={`${
          menuOpen ? "flex" : "hidden"
        } flex-col items-center justify-center fixed inset-0 bg-[#F9F8FF] z-50 p-6 transition-all duration-500 ease-in-out transform`}
        initial={{ opacity: 0 }}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo in Mobile Menu */}
        <Link to="/" className="flex items-center mb-8">
          <LogoDesktop className="w-[120px] md:w-[180px]" />
        </Link>

        {/* Close Button */}
        <motion.button
          onClick={toggleMenu}
          className="absolute text-3xl text-black transition-all duration-300 transform top-4 right-4 hover:scale-110"
          aria-label="Close menu"
          whileHover={{ scale: 1.1 }}
        >
          &times;
        </motion.button>

        {/* Mobile Navbar Links */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center w-full space-y-4 text-center"
        >
          {renderNavLinks()}
        </motion.div>

        <div className="flex items-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/login")}
              className="px-[18.6px] py-[9.5px] cursor border rounded-md"
            >
              Log in
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              type="submit"
              variant="primary"
              onClick={() => navigate("/register")}
              className="px-[14.2px] py-[10.5px] cursor border rounded-md"
            >
              Sign up
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
