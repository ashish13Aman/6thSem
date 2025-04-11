import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  FileText,
  Info,
  Settings,
  LogOut,
  Sun,
  Moon,
  Wallet,
  Share2,
} from "lucide-react";
import Main from "./Main";
import UploadedDocuments from "./UploadedDocuments";
import AboutModal from "./About";
import SettingsModal from "./Settings";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "documents">("home");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [currentSettingsTab, setCurrentSettingsTab] = useState<
    "profile" | "security" | "notifications" | "privacy"
  >("profile");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const menuItems = [
    { icon: Home, text: "Home", onClick: () => setCurrentView("home") },
    {
      icon: FileText,
      text: "Certificates",
      onClick: () => setCurrentView("documents"),
    },
    {
      icon: Share2,
      text: "Shared With Me",
      onClick: () => navigate("/shared"),
    },
    { icon: Info, text: "About", onClick: () => setShowAbout(true) },
    { icon: Settings, text: "Settings", onClick: () => setShowSettings(true) },
    { icon: LogOut, text: "Logout" },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-menu")) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900" : "bg-gray-50"
      } transition-colors duration-200`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800" : "bg-blue-600"
        } text-white shadow-lg transition-colors duration-200`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
              } rounded-lg transition-colors`}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Wallet size={24} className="text-white" />
              <h1 className="text-xl font-bold">SecuredDoc Wallet</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-blue-700"
              } rounded-full transition-all duration-200`}
            >
              {darkMode ? (
                <Sun size={24} className="text-yellow-300" />
              ) : (
                <Moon size={24} className="text-gray-100" />
              )}
            </button>
            <div className="relative profile-menu">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {userData.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {userData.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSettings(true);
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Settings
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          currentTab={currentSettingsTab}
          onTabChange={setCurrentSettingsTab}
          userData={userData}
        />
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`p-4 ${
            darkMode ? "bg-gray-900" : "bg-blue-600"
          } text-white flex justify-between items-center`}
        >
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`p-2 ${
              darkMode ? "hover:bg-gray-800" : "hover:bg-blue-700"
            } rounded-lg transition-colors`}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.onClick) item.onClick();
                setIsMenuOpen(false);
              }}
              className={`flex items-center w-full px-6 py-3 ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-blue-50"
              } transition-colors`}
            >
              <item.icon size={20} className="mr-4" />
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>

      {currentView === "home" ? <Main /> : <UploadedDocuments />}

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}