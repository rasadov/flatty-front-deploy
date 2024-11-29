/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#220D6D",
        hoverPrimary: "#A673EF",
        lightBg: "#F9F8FF",
        darkText: "#0F1D40",
        secondaryBg: "#ECE8FF",
        accent: "#8247E5",
        borderGray: "#EEEFF2",
        cardText: "#525C76",
      },
      spacing: {
        3.75: "15px",
        7.5: "30px",
        15: "60px",
        8.5: "34px",
        9.5: "38px",
        11.24: "45px",
        11: "44px",
        16.26: "65px",
        173: "173px",
      },
      fontSize: {
        customSm: "16px", // Xüsusi sm üçün
        customLg: "36px", // Xüsusi lg üçün
      },
      width: {
        smCustom: "320px", // Xüsusi sm
        mdCustom: "768px", // Xüsusi md
        lgCustom: "1131px", // Xüsusi lg
        78: "78px",
        20: "20px",
      },
      height: {
        54: "54px",
        173: "173px",
        78: "78px",
        20: "20px",
      },
      borderRadius: {
        sm: "3px",
        md: "6px",
        lg: "16px",
        xl: "24px",
        custom6: "6px",
        full: "50%",
      },
      translate: {
        "y-1/2": "-50%",
        "x-1/2": "-50%",
      },
      cursor: {
        pointer: "pointer",
      },
      objectPosition: {
        cover: "cover",
      },
    },
  },
  plugins: [],
};
