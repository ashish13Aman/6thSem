import React, { useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/auth/Input';
import { Button } from '../components/auth/Button';
import { SocialLogin } from '../components/auth/SocialLogin';

export function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'user' | 'admin' | 'issuer'>('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement signup logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Get started with your DigiLocker account"
    >
      <div className="mt-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full name"
            type="text"
            required
            placeholder="Enter your full name"
          />

          <Input
            label="Email address"
            type="email"
            required
            placeholder="Enter your email"
          />

          <Input
            label="Phone number"
            type="tel"
            required
            placeholder="Enter your phone number"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Account type
            </label>
            <div className="flex gap-4">
              {(['user', 'admin', 'issuer'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize ${
                    role === type
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setRole(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Password"
            type="password"
            required
            placeholder="Create a password"
          />

          <Button type="submit" isLoading={isLoading}>
            Create account
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
          Already have an account?{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}