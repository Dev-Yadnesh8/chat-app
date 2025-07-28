import clsx from "clsx";
import { X } from "lucide-react";
import { useState, type ReactNode } from "react";
import IconButton from "./Buttons/IconButton";

interface InputFieldPorps {
  type?: "text" | "password";
  value: string;
  placeholder?: string;
  variant?: "underline" | "solid";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  iconArialLable?: string;
  onChange(e: string): void;
  onClear(): void;
}

function InputField({
  type = "text",
  value,
  onChange,
  placeholder = "",
  variant = "underline", // "solid" or "underline"
  leftIcon,
  rightIcon,
  className = "",
  iconArialLable,
  onClear,
}: InputFieldPorps) {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle =
    "w-full px-3 py-2 text-sm focus:outline-none transition-all duration-200";

  const variants = {
    underline: "border-b border-gray-400 focus:border-black bg-transparent",
    solid:
      "bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 focus:border-black focus:bg-white rounded-xl",
  };

  const showClear = isFocused && value;

  return (
    <div
      className={clsx(
        "flex items-center gap-2",
        variant === "solid" ? "px-2 py-1" : "",
        className,
        variants[variant]
      )}
    >
      {leftIcon && <span>{leftIcon}</span>}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
        className={clsx(baseStyle, "bg-transparent flex-1")}
      />

      {showClear ? (
        <IconButton
          arialLable={iconArialLable ?? "cross-icon"}
          icon={<X className="h-4 w-4" />}
          onClick={onClear}
        />
      ) : rightIcon ? (
        <span className="text-gray-500">{rightIcon}</span>
      ) : null}
    </div>
  );
}

export default InputField;
