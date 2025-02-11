import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  FileCheck,
  Upload,
  QrCode,
  Info,
  Settings,
  Share2,
  HelpCircle,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: FileCheck, label: 'Issued Documents', path: '/issued' },
  { icon: Upload, label: 'Uploaded Documents', path: '/uploaded' },
  { icon: QrCode, label: 'Scan QR Code', path: '/scan' },
  { icon: Info, label: 'About', path: '/about' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: Share2, label: 'Share', path: '/share' },
  { icon: HelpCircle, label: 'Help', path: '/help' }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-600/95 to-blue-800/95 text-white backdrop-blur-sm shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold">SecureDigiVault</h1>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm transition-all duration-150 hover:bg-white/10 ${
                    isActive ? 'bg-white/20 border-r-4 border-white' : ''
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-6">
        <button className="flex items-center px-6 py-3 text-sm w-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150 rounded-lg">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}