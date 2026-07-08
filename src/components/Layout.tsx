import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "./ui/sonner";
export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex w-full relative">
      {/* Overlay for sm/below drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      {/* Sidebar - lg/md: always present, sm/below: drawer only when open */}
      <aside className="hidden lg:block lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:w-64 lg:shrink-0 md:block md:relative">
        <Sidebar />
      </aside>

      {/* Drawer Sidebar - sm/below only, shown when burger clicked */}
      {mobileSidebarOpen && (
        <aside className="fixed top-0 left-0 h-screen w-[85%] max-w-xs z-50 lg:hidden">
          <Sidebar isDrawer={true} onClose={() => setMobileSidebarOpen(false)} />
        </aside>
      )}

      <Toaster />

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Mobile Top Header - sm/below only */}
        <header className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
          <span className="font-extrabold text-base md:hidden">StaffSync</span>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 border md:hidden border-neutral-200 rounded-xl hover:bg-neutral-100"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="lg:hidden"></div>
          <button className="lg:hidden">Icon</button>
        </header>

        {/* View Wrapper */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 md:pl-24 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
