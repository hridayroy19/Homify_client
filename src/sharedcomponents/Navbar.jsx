import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/provider/AuthProvider";
import useAxiosPrivate from "../hooks/axiosPrivate/useAxiosPrivate";

// react-icons
import { MdDashboard, MdSettings, MdLogout } from "react-icons/md";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BsBuilding } from "react-icons/bs";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BiInfoCircle } from "react-icons/bi";
import { RiKey2Line } from "react-icons/ri";

export const HomifyLogo = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="36" height="36" rx="10" fill="#D97706" />
    <path d="M18 7L6 17H9V29H16V22H20V29H27V17H30L18 7Z" fill="white" />
    <rect x="15.5" y="22" width="5" height="7" rx="1" fill="#D97706" />
    <rect x="11" y="18" width="4" height="4" rx="0.5" fill="#FCD34D" />
    <rect x="21" y="18" width="4" height="4" rx="0.5" fill="#FCD34D" />
  </svg>
);

/* ── Navbar ───────────────────────────────────────────────────── */
const Navbar = () => {
  const { userInfo, signout } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [dynamic, setDynamic] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.role === "user") setDynamic("profile");
      else if (userInfo?.role === "admin") setDynamic("");
      else setDynamic("agentDashboard");
    }
  }, [userInfo]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onSignout = () => {
    signout()
      .then(() => {
        if (userInfo?.email) {
          axiosPrivate
            .post("/jwt/clear-token", { email: userInfo?.email })
            .then((res) => {
              if (res.data.success) {
                setDropdownOpen(false);
                setMobileOpen(false);
                navigate("/signin");
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };

  const navItems = [
    { label: "Home", to: "", end: true, Icon: HiHome },
    { label: "Rent", to: "rent", end: false, Icon: RiKey2Line },
    { label: "Sale", to: "sell", end: false, Icon: BsBuilding },
    { label: "Contact", to: "contact", end: false, Icon: IoChatbubblesOutline },
    { label: "About", to: "about", end: false, Icon: BiInfoCircle },
  ];

  const avatarLetter = (userInfo?.name ||
    userInfo?.email ||
    "U")[0].toUpperCase();

  const desktopLinkClass = ({ isActive }) =>
    `relative px-3 py-1 text-md uppercase font-medium transition-colors duration-200 after:absolute after:left-3 after:w-12 after:bottom-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
      isActive
        ? "text-amber-600 font-semibold after:w-12 after:bg-amber-500"
        : "text-gray-600 hover:text-amber-600 after:w-12 hover:after:w-12 hover:after:bg-amber-400"
    }`;

  return (
    <>
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .dropdown-enter { animation: fadeDown 0.18s ease-out; }

        /* Drawer slide-in from right */
        .drawer-overlay {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.35s ease;
        }
        .drawer-overlay.open {
          background: rgba(0,0,0,0.45);
          pointer-events: all;
        }
        .drawer-panel {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: min(300px, 82vw);
          background: #fff;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex; flex-direction: column;
          box-shadow: -4px 0 24px rgba(0,0,0,0.1);
        }
        .drawer-overlay.open .drawer-panel {
          transform: translateX(0);
        }
      `}</style>

      {/* ── Nav Bar ── */}
      <nav
        className={` fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? "shadow-md border-gray-200 static" : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="" className="flex items-center gap-2.5 flex-shrink-0">
            <HomifyLogo />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-gray-900 tracking-tight">
                Homify<span className="text-amber-600">Estate</span>
              </span>
              <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400 mt-0.5">
                Find Your Home
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden  lg:flex items-center gap-0.5 list-none m-0 p-0">
            {navItems.map(({ label, to, end }) => (
              <li key={to}>
                <NavLink cl to={to} end={end} className={desktopLinkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Logged-in: Avatar + Dropdown */}
            {userInfo ? (
              <div className="relative lg:block hidden" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  title={userInfo?.email}
                  aria-expanded={dropdownOpen}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm border-2 border-amber-200 hover:border-amber-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                >
                  {avatarLetter}
                </button>

                {dropdownOpen && (
                  <div className="dropdown-enter absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    {/* Header */}
                    <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-amber-50/70">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {avatarLetter}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {userInfo?.name || "User"}
                        </p>
                        <p className="text-xs text-amber-600 capitalize">
                          {userInfo?.role}
                        </p>
                      </div>
                    </div>
                    {/* Links */}
                    <div className="py-1">
                      {[
                        {
                          to: `/dashboard/${dynamic}`,
                          label: "Dashboard",
                          Icon: MdDashboard,
                        },
                        {
                          to: "/dashboard/profile",
                          label: "My Profile",
                          Icon: FaUserCircle,
                        },
                        {
                          to: "/dashboard/settings",
                          label: "Settings",
                          Icon: MdSettings,
                        },
                      ].map(({ to, label, Icon }) => (
                        <Link
                          key={to}
                          to={to}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-150"
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {label}
                        </Link>
                      ))}
                    </div>
                    {/* Logout */}
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={onSignout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                      >
                        <MdLogout className="w-4 h-4 flex-shrink-0" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200"
              aria-label="Open menu"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`drawer-overlay lg:hidden ${mobileOpen ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
      >
        <div className="drawer-panel">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <Link
              to=""
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <HomifyLogo />
              <span className="font-bold text-base text-gray-900">
                Homify<span className="text-amber-600">Estate</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* User chip (if logged in) */}
          {userInfo && (
            <div className="mx-4 mt-4 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userInfo?.name || "User"}
                </p>
                <p className="text-xs text-amber-600 capitalize">
                  {userInfo?.role}
                </p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-1">
              Navigation
            </p>
            {navItems.map(({ label, to, end, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-amber-500 text-white"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                  }`
                }
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
              </NavLink>
            ))}

            {/* Dashboard links (logged-in) */}
            {userInfo && (
              <>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 mt-4 mb-1">
                  Account
                </p>
                {[
                  {
                    to: `/dashboard/${dynamic}`,
                    label: "Dashboard",
                    Icon: MdDashboard,
                  },
                  {
                    to: "/dashboard/profile",
                    label: "My Profile",
                    Icon: FaUserCircle,
                  },
                  {
                    to: "/dashboard/settings",
                    label: "Settings",
                    Icon: MdSettings,
                  },
                ].map(({ to, label, Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="px-4 py-4 border-t border-gray-100">
            {userInfo ? (
              <button
                onClick={() => {
                  onSignout();
                  setMobileOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-sm font-semibold transition-colors duration-200"
              >
                <MdLogout className="w-4 h-4" />
                Log Out
              </button>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
