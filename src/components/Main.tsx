import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, FileText, Shield, QrCode, Users, FileCheck, Download } from 'lucide-react';

export default function Main() {
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
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Your Digital Document Wallet
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Store, access, and share your important documents securely from anywhere, anytime.
              SecuredDoc Wallet provides a secure cloud-based platform for all your document needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <FileText className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Official Documents</h3>
                  <p className="text-gray-600 dark:text-gray-300">Access your verified documents instantly</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Secure Storage</h3>
                  <p className="text-gray-600 dark:text-gray-300">Your documents are encrypted and safely stored</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <QrCode className="text-blue-500 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">Quick Share</h3>
                  <p className="text-gray-600 dark:text-gray-300">Share documents instantly using QR codes</p>
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
    </>
  );
}