import classNames from "classnames";

export const Button = ({
  children,
  variant = "primary",
  isLoading = false,
  className,
  onClick,
  onMouseOver,
  onMouseOut,
  onFocus,
  onBlur,
  style,
  ...props
}) => {
  const variants = {
    primary: "bg-accent hover:bg-hoverPrimary focus:bg-accent text-white",
    secondary:
      "text-accent bg-white border border-accent hover:bg-hoverPrimary hover:text-white",
    cancel: "text-darkText bg-gray-100 hover:bg-gray-300",
  };

  return (
    <button
      className={classNames(
        "flex items-center justify-center gap-2   transition-colors duration-300 ease-in-out focus:outline-none disabled:opacity-50",
        variants[variant],
        className
      )}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={isLoading}
      style={style}
      {...props}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <span className="flex items-center gap-2">{children}</span>
      )}
    </button>
  );
};

export default Button;
