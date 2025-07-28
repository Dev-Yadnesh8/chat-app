import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick(): void;
  className?: string;
  arialLable: string;
}

function IconButton({ icon, onClick,arialLable , className }: IconButtonProps) {
  return (
    <button
    aria-label={arialLable}
      onClick={onClick}
      className={`p-1.5 transition-all duration-400 ease cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800  rounded-xl ${
        className && className
      }`}
    >
      {icon}
    </button>
  );
}

export default IconButton;
