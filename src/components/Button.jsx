// Button.js
import classNames from "classnames";

const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  className,
  onClick,
  onMouseOver,
  onMouseOut,
  onFocus,
  onBlur,
  ...props
}) => {
  const variants = {
    primary: "bg-[#8247E5] hover:bg-[#A673EF] focus:bg-[#8247E5]",
    secondary:
      "text-[#8247E5] bg-white border border-[#8247E5] hover:bg-[#A673EF] hover:text-white",
    cancel: "text-gray-700 bg-gray-100 hover:bg-gray-300",
  };

  return (
    <button
      className={classNames(
        "text-lg rounded-[3px] transition-colors duration-300 ease-in-out focus:outline-none disabled:opacity-50",
        variants[variant],
        className
      )}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
