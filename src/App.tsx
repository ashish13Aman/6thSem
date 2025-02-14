import React, { useState, useEffect } from 'react';
import { Menu, X, Home, FileText, Upload, QrCode, Info, Settings, Share2, HelpCircle, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const menuItems = [
    { icon: Home, text: 'Home' },
    { icon: FileText, text: 'Issued Documents' },
    { icon: Upload, text: 'Uploaded Documents' },
    { icon: QrCode, text: 'Scan QR Code' },
    { icon: Info, text: 'About' },
    { icon: Settings, text: 'Settings' },
    { icon: Share2, text: 'Share' },
    { icon: HelpCircle, text: 'Help' },
    { icon: LogOut, text: 'Logout' },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">DigiLocker</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors"
            >
              <item.icon size={20} className="mr-4" />
              <span>{item.text}</span>
            </a>
          ))}
        </nav>
      </div>

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
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Your Digital Document Wallet
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Store, access, and share your important documents securely from anywhere, anytime.
              DigiLocker provides a secure cloud-based platform for all your document needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <FileText className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Official Documents</h3>
                  <p className="text-gray-600">Access your government-issued documents instantly</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Upload className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Easy Upload</h3>
                  <p className="text-gray-600">Upload and organize your personal documents securely</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <QrCode className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800">Quick Share</h3>
                  <p className="text-gray-600">Share documents instantly using QR codes</p>
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
      </main>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}

export default App;