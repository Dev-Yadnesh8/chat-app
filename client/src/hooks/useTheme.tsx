import { useEffect, useState } from "react";

type ThemeModes = "light" | "dark";

interface UseThemeHookModel {
  themeMode: ThemeModes;
  toggleTheme(): void;
}
function useTheme(): UseThemeHookModel {
  const getInitialTheme = (): ThemeModes => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
    }
    return "dark";
  };

  const [themeMode, setThemeMode] = useState<ThemeModes>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeMode === "dark");
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const toggleTheme = (): void => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { themeMode, toggleTheme };
}

export default useTheme;
