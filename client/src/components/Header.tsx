import { Moon, Sun } from "lucide-react";
import IconButton from "./Buttons/IconButton";
import { useTheme } from "../hooks";
import { APPNAME } from "../utils/constants";

function Header() {
  const { themeMode, toggleTheme } = useTheme();
  return (
    <header className="h-16 w-full shadow-2xs shadow-gray-200 dark:shadow-gray-800 flex justify-center items-center px-4">
      <div className="w-full max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-x-2">
        <img src="/meetme.png" alt="Meetme logo" className="h-10 w-10" />
        <h2 className="text-2xl font-bold tracking-wider">{APPNAME.toUpperCase()}</h2>
      </div>
      <IconButton
        icon={themeMode === "dark" ? <Moon /> : <Sun />}
        arialLable="theme-toggle"
        onClick={toggleTheme}
      />
      </div>
    </header>
  );
}

export default Header;
