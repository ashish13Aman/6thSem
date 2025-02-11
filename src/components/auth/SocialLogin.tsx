import React from 'react';
import { Button } from './Button';

export function SocialLogin() {
  return (
    <div className="space-y-3">
      <Button
        variant="social"
        onClick={() => console.log('Google login')}
        className="flex items-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continue with Google
      </Button>
      <Button
        variant="social"
        onClick={() => console.log('Facebook login')}
        className="flex items-center gap-2"
      >
        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
        Continue with Facebook
      </Button>
    </div>
  );
}