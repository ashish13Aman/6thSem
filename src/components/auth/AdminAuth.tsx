import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, AlertTriangle } from 'lucide-react';

interface FormData {
  adminId: string;
  password: string;
  mfaCode: string;
}

export default function AdminAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    adminId: '',
    password: '',
    mfaCode: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.adminId) {
      newErrors.adminId = 'Admin ID is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (!formData.mfaCode) {
      newErrors.mfaCode = 'MFA Code is required';
    } else if (!/^\d{6}$/.test(formData.mfaCode)) {
      newErrors.mfaCode = 'MFA Code must be 6 digits';
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
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
          <p className="text-blue-200 mt-2">Secure access to management dashboard</p>
        </div>

        {/* Auth Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg mb-6">
            <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-medium text-yellow-500">Authorized Access Only</h4>
              <p className="text-sm text-yellow-400/80 mt-1">
                This portal is restricted to verified administrators. All login attempts are monitored and logged.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Admin ID */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="adminId"
                  value={formData.adminId}
                  onChange={handleInputChange}
                  placeholder="Admin ID or Email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.adminId ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.adminId && (
                <p className="mt-1 text-sm text-red-400">{errors.adminId}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* MFA Code */}
            <div>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="mfaCode"
                  value={formData.mfaCode}
                  onChange={handleInputChange}
                  placeholder="2FA Code"
                  maxLength={6}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    errors.mfaCode ? 'border-red-500' : 'border-gray-600'
                  } bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.mfaCode && (
                <p className="mt-1 text-sm text-red-400">{errors.mfaCode}</p>
              )}
              <p className="mt-2 text-sm text-gray-400">
                Enter the 6-digit code from your authenticator app
              </p>
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