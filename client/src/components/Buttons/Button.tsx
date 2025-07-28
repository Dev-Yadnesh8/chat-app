import type { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit";
  icon?: ReactNode;
  label: string;
  onClick(): void;
  className?: string;
  variant?: "solid" | "outlined" | "filled";
}

function Button({
  type = "button",
  icon,
  label,
  onClick,
  className = "",
  variant = "solid",
}:ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 transition duration-500 ease cursor-pointer";

  const variants = {
    solid: "bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 rounded-xl",
    outlined: "border bg-transparent hover:bg-white/10",
    filled: " text-white  px-10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {label}
    </button>
  );
}
export default Button;
