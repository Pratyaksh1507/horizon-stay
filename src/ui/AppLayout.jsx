import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageSkeleton from "./PageSkeleton";
import { useSidebar } from "../context/SidebarContext";

function AppLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`grid h-screen bg-zinc-950 transition-all duration-300 ease-in-out ${
        isCollapsed ? "grid-cols-[6rem_1fr]" : "grid-cols-[26rem_1fr]"
      }`}
    >
      <Sidebar />
      <div className="flex flex-col overflow-hidden min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-[140rem] flex flex-col gap-6">
            <Suspense fallback={<PageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
