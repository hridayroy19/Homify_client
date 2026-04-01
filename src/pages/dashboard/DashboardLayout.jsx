import { Link, Outlet } from "react-router-dom";
import logo from "./logo2.png";
import Agent from "../../components/dashboard/agent/Agent";
import { useContext } from "react";
import { AuthContext } from "../../utils/provider/AuthProvider";
import AdminNav from "../../components/dashboard/admin/AdminNav";
import UserNav from "../../components/dashboard/user/UserNav";
import { Toaster } from "react-hot-toast";

const DashboardLayout = () => {
  const { userInfo } = useContext(AuthContext);

  const NavContent = () => (
    <>
      {userInfo?.role === "admin" && <AdminNav />}
      {userInfo?.role === "agent" && <Agent />}
      {userInfo?.role === "user" && <UserNav />}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Toaster />

      {/* ── Mobile topbar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 h-14 bg-white border-b border-gray-200 shadow-sm">
        <Link to="/" className="text-lg font-bold text-gray-800">
          HomifyEstate
        </Link>
        <div className="drawer drawer-end w-auto">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="mobile-drawer" className="btn btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-40">
            <label
              htmlFor="mobile-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <div className="w-64 min-h-full bg-white flex flex-col py-4 px-3">
              <Link to="/" className="flex items-center gap-2 px-2 mb-6">
                <img src={logo} alt="logo" className="h-8 w-auto" />
                <span className="font-bold text-gray-800">HomifyEstate</span>
              </Link>
              <NavContent />
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-[240px] bg-white border-r border-gray-200 z-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 px-5 py-4 border-b border-gray-100"
        >
          <img src={logo} alt="logo" className="h-8 w-auto" />
          <span className="font-bold text-gray-800 text-base">
            HomifyEstate
          </span>
        </Link>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <NavContent />
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-gray-100 text-xs text-gray-400">
          {userInfo?.role && (
            <span className="capitalize bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {userInfo.role}
            </span>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="lg:ml-[240px] pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
