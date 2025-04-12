import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, User, Wallet, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  styled,
  alpha,
  InputAdornment,
  CircularProgress
} from '@mui/material';

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha('#ffffff', 0.7),
  backdropFilter: 'blur(10px)',
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: alpha('#ffffff', 0.5),
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: alpha('#ffffff', 0.7),
    },
    '&.Mui-focused': {
      background: alpha('#ffffff', 0.9),
    },
  },
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 12,
  padding: '16px',
  flex: 1,
  transition: 'all 0.3s ease-in-out',
  '&.Mui-selected': {
    background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
    color: '#ffffff',
    '&:hover': {
      background: 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)',
    },
  },
}));

interface RegisterFormData {
  fullName: string;
  email: string;
  walletAddress: string;
  role: 'user' | 'admin';
}

export default function Register() {
  const navigate = useNavigate();
  const { account, error: walletError, isConnecting, connectWallet } = useWallet();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    walletAddress: '',
    role: 'user'
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    if (account) {
      setFormData(prev => ({ ...prev, walletAddress: account }));
    }
  }, [account]);

  const validateForm = () => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Please connect your wallet';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      navigate(formData.role === 'admin' ? '/admin-login' : '/user-login');
    } catch (err) {
      setErrors(prev => ({ ...prev, submit: 'Registration failed. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1 }}
      >
        <GlassCard>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Shield size={48} className="mx-auto mb-4 text-blue-600" />
              </motion.div>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Create Your Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Join SecureDoc to manage your documents securely
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <ToggleButtonGroup
                  value={formData.role}
                  exclusive
                  onChange={(e, newRole) => newRole && setFormData(prev => ({ ...prev, role: newRole }))}
                  fullWidth
                >
                  <StyledToggleButton value="user">
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                      <User size={24} />
                      <Typography variant="body2">User</Typography>
                    </Box>
                  </StyledToggleButton>
                  <StyledToggleButton value="admin">
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                      <Shield size={24} />
                      <Typography variant="body2">Admin</Typography>
                    </Box>
                  </StyledToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Box mb={3}>
                <StyledTextField
                  fullWidth
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={20} className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mb={3}>
                <StyledTextField
                  fullWidth
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={20} className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mb={3}>
                <Box display="flex" gap={2}>
                  <StyledTextField
                    fullWidth
                    name="walletAddress"
                    value={formData.walletAddress}
                    placeholder="Connect your wallet"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Wallet size={20} className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={connectWallet}
                    disabled={isConnecting}
                    sx={{
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)',
                      },
                      minWidth: '160px',
                    }}
                  >
                    {isConnecting ? (
                      <>
                        <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Wallet size={20} className="mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </Box>
                {walletError && (
                  <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                    {walletError}
                  </Typography>
                )}
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting || !account}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  background: formData.role === 'admin'
                    ? 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)'
                    : 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
                  '&:hover': {
                    background: formData.role === 'admin'
                      ? 'linear-gradient(135deg, #7e22ce 0%, #4f46e5 100%)'
                      : 'linear-gradient(135deg, #2563eb 0%, #4338ca 100%)',
                  },
                }}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </Button>

              <Box mt={3} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button
                    component="a"
                    href="/login"
                    color="primary"
                    sx={{ textTransform: 'none', fontWeight: 'medium' }}
                  >
                    Sign in
                  </Button>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </GlassCard>
      </motion.div>
    </Box>
  );
}