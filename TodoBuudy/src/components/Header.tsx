import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "./Button"; 
import type { RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import logo from '../assets/logo.png';
import userL from '../assets/user.jpg';
import adminL from '../assets/admin.jpg';

const DashboardHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const role = user?.role || "";
  const isAdmin = role === "admin";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <header className="bg-white shadow-md px-10 py-3 flex justify-between items-center">
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <img src={logo} alt="Logo" className="w-6 h-6" />
        <span className="text-lg font-bold text-gray-900">TaskMaster</span>
      </div>

      {/* Middle: Static Nav */}
      <nav className="flex gap-6 text-sm text-gray-500">
        <span className="cursor-default hover:text-black">Home</span>
        <span className="cursor-default font-semibold text-black">Tasks</span>
        <span className="cursor-default hover:text-black">Projects</span>
        <span className="cursor-default hover:text-black">Team</span>
      </nav>

      {/* Right: + button (Admin only) & User Dropdown */}
      <div className="flex items-center gap-6">
        {isAdmin && (
          <button
            onClick={() => navigate("/userlist")}
            className="text-blue-600 text-3xl hover:scale-110 cursor-pointer transition-transform"
          >
            +
          </button>
        )}

        {user && (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <img
              src={isAdmin ? adminL : userL}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            />

            {/* Dropdown */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10 flex flex-col
                           transform origin-top transition-all duration-200 scale-95 animate-dropdown"
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    handleLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="text-left px-4 py-2"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
