import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useLocalStorageState(
    false,
    "horizon-sidebar-collapsed"
  );

  function toggleSidebar() {
    setIsCollapsed((prev) => !prev);
  }

  function collapseSidebar() {
    setIsCollapsed(true);
  }

  function expandSidebar() {
    setIsCollapsed(false);
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        collapseSidebar,
        expandSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
