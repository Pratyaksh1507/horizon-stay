import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(true, "isDarkMode");

  useEffect(
    function () {
      const root = document.documentElement;
      if (isDarkMode) {
        root.classList.add("dark", "dark-mode");
        root.classList.remove("light", "light-mode");
        root.style.colorScheme = "dark";
      } else {
        root.classList.add("light", "light-mode");
        root.classList.remove("dark", "dark-mode");
        root.style.colorScheme = "light";
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
