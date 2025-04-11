import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, User, Users, Sun, Moon, ChevronRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = () => {
    if (selectedRole === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/user-login');
    }
  };

  const backgroundGradient = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'
    : 'bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200';

  return (
    <div className={`min-h-screen ${backgroundGradient} transition-colors duration-500`}>
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800/50 text-yellow-400 hover:bg-gray-700/50'
              : 'bg-white/50 text-gray-700 hover:bg-white/70'
          }`}
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`max-w-md w-full backdrop-blur-lg rounded-2xl ${
            darkMode
              ? 'bg-gray-900/50 text-white'
              : 'bg-white/70 text-gray-900'
          } shadow-2xl overflow-hidden`}
        >
          {/* Header */}
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600"
            >
              <Shield size={40} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-2">Welcome to SecureDoc</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose your login type to continue
            </p>
          </div>

          {/* Login Options */}
          <div className="p-8 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('user')}
              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-colors ${
                selectedRole === 'user'
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white/50 text-gray-800 hover:bg-white/80'
              }`}
            >
              <div className={`p-3 rounded-lg ${selectedRole === 'user' ? 'bg-blue-700' : 'bg-blue-100'}`}>
                <User size={24} className={selectedRole === 'user' ? 'text-white' : 'text-blue-600'} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">User Login</h3>
                <p className={`text-sm ${selectedRole === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Access your document wallet
                </p>
              </div>
              <ChevronRight size={20} className={selectedRole === 'user' ? 'text-white' : 'text-gray-400'} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('admin')}
              className={`w-full p-4 rounded-xl flex items-center gap-4 transition-colors ${
                selectedRole === 'admin'
                  ? 'bg-purple-600 text-white'
                  : darkMode
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  : 'bg-white/50 text-gray-800 hover:bg-white/80'
              }`}
            >
              <div className={`p-3 rounded-lg ${selectedRole === 'admin' ? 'bg-purple-700' : 'bg-purple-100'}`}>
                <Users size={24} className={selectedRole === 'admin' ? 'text-white' : 'text-purple-600'} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold">Admin Login</h3>
                <p className={`text-sm ${selectedRole === 'admin' ? 'text-purple-100' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Manage and verify documents
                </p>
              </div>
              <ChevronRight size={20} className={selectedRole === 'admin' ? 'text-white' : 'text-gray-400'} />
            </motion.button>

            {selectedRole && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleLogin}
                className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-medium ${
                  selectedRole === 'admin'
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                <Lock size={20} />
                Continue as {selectedRole === 'admin' ? 'Admin' : 'User'}
              </motion.button>
            )}
          </div>

          {/* Footer */}
          <div className={`p-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © SecureDoc Wallet
          </div>
        </motion.div>
      </div>
    </div>
  );
}