import React, { useState, useEffect } from 'react';
import { Menu, X, Home, FileText, QrCode, Info, Settings, Share2, HelpCircle, LogOut, ChevronLeft, ChevronRight, Users, FileCheck, Shield, Download, Sun, Moon, Wallet, User, Bell, Lock, Globe, Key, Smartphone, Mail, Camera } from 'lucide-react';
import UploadedDocuments from './components/UploadedDocuments';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'documents'>('home');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [currentSettingsTab, setCurrentSettingsTab] = useState<'profile' | 'security' | 'notifications' | 'privacy'>('profile');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80",
      title: "Digital Document Storage",
      description: "Store all your important documents securely in one place"
    },
    {
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      title: "Easy Document Sharing",
      description: "Share your documents securely with just a few clicks"
    },
    {
      image: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&w=800&q=80",
      title: "Quick Access Anywhere",
      description: "Access your documents anytime, anywhere on any device"
    }
  ];

  const stats = [
    { icon: Users, label: "Registered Users", value: "10M+" },
    { icon: FileCheck, label: "Documents Issued", value: "50M+" },
    { icon: Download, label: "Downloads", value: "100M+" }
  ];

  const processSteps = [
    {
      icon: Users,
      title: "Register Yourself",
      description: "Create your SecuredDoc Wallet account in minutes"
    },
    {
      icon: Shield,
      title: "Verify Your Identity",
      description: "Secure verification process for your protection"
    },
    {
      icon: FileCheck,
      title: "Access Documents",
      description: "Instantly access your verified documents"
    }
  ];

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const menuItems = [
    { icon: Home, text: 'Home', onClick: () => setCurrentView('home') },
    { icon: FileText, text: 'Certificates', onClick: () => setCurrentView('documents') },
    { icon: QrCode, text: 'Scan QR Code' },
    { icon: Info, text: 'About', onClick: () => setShowAbout(true) },
    { icon: Settings, text: 'Settings', onClick: () => setShowSettings(true) },
    { icon: Share2, text: 'Share' },
    { icon: HelpCircle, text: 'Help' },
    { icon: LogOut, text: 'Logout' },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-blue-600'} text-white shadow-lg transition-colors duration-200`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} rounded-lg transition-colors`}
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
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-700'} rounded-full transition-all duration-200`}
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
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{userData.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userData.email}</p>
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
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 p-6 border-r border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Settings</h2>
                <nav className="space-y-1">
                  {settingsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentSettingsTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        currentSettingsTab === tab.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon size={20} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {settingsTabs.find(tab => tab.id === currentSettingsTab)?.label}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6">
                  {currentSettingsTab === 'profile' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <img
                            src={userData.avatar}
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover"
                          />
                          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                            <Camera size={16} />
                          </button>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{userData.name}</h4>
                          <p className="text-gray-500">{userData.email}</p>
                        </div>
                      </div>

                      <div className="grid gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            defaultValue={userData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue={userData.phone}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSettingsTab === 'security' && (
                    <div className="space-y-6">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="text-yellow-600 mt-0.5" size={20} />
                          <div>
                            <h4 className="text-sm font-medium text-yellow-800">Security Status</h4>
                            <p className="text-sm text-yellow-700 mt-1">Your account security can be improved</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Password</h4>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                          <Key size={20} />
                          Change Password
                        </button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between py-4 border-t border-gray-200">
                          <div className="flex items-center gap-3">
                            <Smartphone size={20} className="text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">Authenticator App</p>
                              <p className="text-sm text-gray-500">Use an authenticator app to generate verification codes</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSettingsTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Email Notifications</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                            <span className="text-sm text-gray-700">Document verification updates</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                            <span className="text-sm text-gray-700">Security alerts</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm text-gray-700">Marketing communications</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Push Notifications</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                            <span className="text-sm text-gray-700">Document sharing notifications</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                            <span className="text-sm text-gray-700">New feature announcements</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSettingsTab === 'privacy' && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Document Visibility</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="visibility"
                              className="w-4 h-4 text-blue-600"
                              defaultChecked
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Private</p>
                              <p className="text-sm text-gray-500">Only you can see your documents</p>
                            </div>
                          </label>
                          <label className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="visibility"
                              className="w-4 h-4 text-blue-600"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Selective Sharing</p>
                              <p className="text-sm text-gray-500">Share documents with specific users or organizations</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">Data Usage</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" defaultChecked />
                            <span className="text-sm text-gray-700">Allow usage analytics to improve service</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-sm text-gray-700">Share anonymous usage data</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowSettings(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 backdrop-blur-modal bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-800">About SecuredDoc Wallet</h2>
              <button
                onClick={() => setShowAbout(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-12">
              {/* Introduction */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Your Digital Document Platform</h3>
                <p className="text-gray-600 leading-relaxed">
                  SecuredDoc Wallet is a premier digital platform for document storage, sharing, and verification. 
                  It provides users with a secure cloud-based storage space for all their important documents, 
                  enabling easy access and sharing while ensuring complete privacy and security.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                    <stat.icon size={32} className="mx-auto mb-4 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Process Steps */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {processSteps.map((step, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-200">
                      <step.icon size={32} className="text-blue-600 mb-4" />
                      <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose SecuredDoc Wallet?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Shield className="text-blue-600 mr-3" size={20} />
                    <span className="text-gray-700">Secure, encrypted storage for all your documents</span>
                  </li>
                  <li className="flex items-center">
                    <FileCheck className="text-blue-600 mr-3" size={20} />
                    <span className="text-gray-700">Verified authentic documents</span>
                  </li>
                  <li className="flex items-center">
                    <Share2 className="text-blue-600 mr-3" size={20} />
                    <span className="text-gray-700">Easy sharing with other users and organizations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-blue-600'} text-white flex justify-between items-center`}>
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className={`p-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-blue-700'} rounded-lg transition-colors`}
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
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-blue-50'
              } transition-colors`}
            >
              <item.icon size={20} className="mr-4" />
              <span>{item.text}</span>
            </button>
          ))}
        </nav>
      </div>

      {currentView === 'home' ? (
        <>
          {/* Carousel Section */}
          <div className="relative h-[500px] overflow-hidden mx-4 my-6 rounded-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                  index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 flex items-center z-20">
                  <div className="container mx-auto px-8">
                    <div className="max-w-xl text-white">
                      <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                      <p className="text-xl">{slide.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full z-30 backdrop-blur-sm transition-colors"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full z-30 backdrop-blur-sm transition-colors"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your Digital Document Wallet
                </h2>
                <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Store, access, and share your important documents securely from anywhere, anytime.
                  SecuredDoc Wallet provides a secure cloud-based platform for all your document needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <FileText className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Official Documents</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Access your verified documents instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Shield className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Secure Storage</h3>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your documents are encrypted and safely stored</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <QrCode className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Share</h3>
                      <p className={`${darkMode ? 'text-gray-300' : ' text-gray-600'}`}>Share documents instantly using QR codes</p>
                    </div>
                  </div>
                </div>
                <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </button>
              </div>
              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?auto=format&fit=crop&w=800&q=80"
                  alt="Digital Documents"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-6 text-center hover:shadow-lg transition-shadow`}>
                  <stat.icon size={32} className="mx-auto mb-4 text-blue-500" />
                  <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</div>
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="mt-20 space-y-6">
              <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>How It Works</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} rounded-xl p-8 hover:shadow-lg transition-all duration-200`}>
                    <step.icon size={32} className="text-blue-500 mb-4" />
                    <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{step.title}</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </>
      ) : (
        <UploadedDocuments />
      )}

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;