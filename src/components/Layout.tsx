import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function Layout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-neutral-50 flex w-full relative">
      {" "}
      {/* Mobile Navigation Drawer Overlay */}{" "}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-[#334155]/15 z-40 md:hidden"
        />
      )}{" "}
      {/* Sidebar Container */}{" "}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 z-50 shrink-0 transition-transform duration-300 md:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {" "}
        <Sidebar onClose={() => setMobileSidebarOpen(false)} />{" "}
      </aside>{" "}
      {/* Main Panel Content Workspace */}{" "}
      <div className="flex-1 min-w-0 flex flex-col h-screen">
        {" "}
        {/* Mobile Top Header Toolbar */}{" "}
        <header className="flex items-center justify-between px-6 py-4 md:hidden border-b border-neutral-200 bg-white">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 border border-neutral-200 rounded-xl hover:bg-neutral-100"
            >
              {" "}
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />{" "}
              </svg>{" "}
            </button>{" "}
            <span className="font-extrabold text-base">StaffSync</span>{" "}
          </div>{" "}
        </header>{" "}
        {/* View Wrapper */}{" "}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
          {" "}
          <Outlet />{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
}
