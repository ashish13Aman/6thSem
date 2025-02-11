import React, { useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { OTPInput } from '../components/auth/OTPInput';
import { Button } from '../components/auth/Button';

export function OTPVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    setIsLoading(true);
    // Implement OTP verification logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleResend = () => {
    // Implement resend OTP logic here
    console.log('Resending OTP...');
  };

  return (
    <AuthLayout
      title="Verify your account"
      subtitle="We've sent a verification code to your email/phone"
    >
      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <OTPInput
            length={6}
            onComplete={(value) => setOtp(value)}
          />
          <p className="text-sm text-center text-gray-600">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Resend
            </button>
          </p>
        </div>

        <Button
          onClick={handleVerify}
          isLoading={isLoading}
          disabled={otp.length !== 6}
        >
          Verify
        </Button>
      </div>
    </AuthLayout>
  );
}