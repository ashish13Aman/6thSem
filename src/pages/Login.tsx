import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/auth/Input';
import { Button } from '../components/auth/Button';
import { SocialLogin } from '../components/auth/SocialLogin';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement login logic here
    setTimeout(() => {
      setIsLoading(false);
      // After successful login, navigate to home
      navigate('/');
    }, 2000);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <div className="mt-8 space-y-6">
        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg ${
              loginMethod === 'email'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setLoginMethod('email')}
          >
            Email
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-lg ${
              loginMethod === 'phone'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setLoginMethod('phone')}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {loginMethod === 'email' ? (
            <Input
              label="Email address"
              type="email"
              required
              placeholder="Enter your email"
            />
          ) : (
            <Input
              label="Phone number"
              type="tel"
              required
              placeholder="Enter your phone number"
            />
          )}

          <Input
            label="Password"
            type="password"
            required
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Sign in
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <SocialLogin />

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}