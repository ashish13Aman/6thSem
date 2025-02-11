import React, { useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/auth/Input';
import { Button } from '../components/auth/Button';

export function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'newPassword'>('email');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'email') setStep('otp');
      else if (step === 'otp') setStep('newPassword');
    }, 2000);
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle={
        step === 'email'
          ? "Enter your email to reset your password"
          : step === 'otp'
          ? "Enter the verification code sent to your email"
          : "Create a new password"
      }
    >
      <div className="mt-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 'email' && (
            <Input
              label="Email address"
              type="email"
              required
              placeholder="Enter your email"
            />
          )}

          {step === 'otp' && (
            <OTPInput
              length={6}
              onComplete={(otp) => console.log(otp)}
            />
          )}

          {step === 'newPassword' && (
            <>
              <Input
                label="New password"
                type="password"
                required
                placeholder="Enter new password"
              />
              <Input
                label="Confirm password"
                type="password"
                required
                placeholder="Confirm new password"
              />
            </>
          )}

          <Button type="submit" isLoading={isLoading}>
            {step === 'email'
              ? 'Send reset link'
              : step === 'otp'
              ? 'Verify'
              : 'Reset password'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}