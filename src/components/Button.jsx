function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} hover:text-black transition-all duration-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
