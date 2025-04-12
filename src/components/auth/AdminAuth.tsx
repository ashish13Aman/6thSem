import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Wallet, ArrowRight } from 'lucide-react';

interface LoginFormData {
  walletAddress: string;
  fullName: string;
}

export default function AdminAuth() {
  const [formData, setFormData] = useState<LoginFormData>({
    walletAddress: '',
    fullName: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Wallet address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      newErrors.walletAddress = 'Invalid wallet address format';
    }
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate authentication
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-blue-200 mt-2">Secure access to management dashboard</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Wallet Address */}
            <div>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleInputChange}
                  placeholder="Admin Wallet Address (0x...)"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.walletAddress ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.walletAddress && (
                <p className="mt-1 text-sm text-red-400">{errors.walletAddress}</p>
              )}
            </div>

            {/* Full Name */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700
                transition-all duration-300 flex items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              Sign In to Admin Portal
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Help Link */}
          <p className="mt-6 text-center text-gray-400 text-sm">
            Need assistance?{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}