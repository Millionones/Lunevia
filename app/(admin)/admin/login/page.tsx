'use client';

import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ThemeProvider from '../theme/ThemeProvider';
import { useAppDispatch } from '../store';
import { setCredentials } from '../store/authSlice';
import { authService } from '../../lib/authService';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({ newPassword: '', confirmPassword: '' });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.login({ email, password });
      if (result.login == false) {
        setShowCreatePassword(true)
      } else {
        dispatch(
          setCredentials({
            token: result.token,
            user: result.user,
            access: result.access
          })
        );
        if (result.access.includes('dashboard_control')) router.push('/dashboard');
        else if (result.access.includes('lead_control')) router.push('/leads');
        else if (result.access.includes('user_controll')) router.push('/settings/user');
        else if (result.access.includes('role_controll')) router.push('/settings/user-role');
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to sign in. Please try again.';
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await authService.createPassword({ password: newPassword.newPassword, email });
      if (result.success) {
        setSuccess(result.message)
        setShowCreatePassword(false)
        setPassword('')
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unable to create password. Please try again.';
      setError(Array.isArray(message) ? message.join(', ') : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          backgroundImage: 'url(/Blue.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Card>
            {
              showCreatePassword ? (
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center">
                    Create Password
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 3 }}
                  >
                    Create a new password to access the admin portal
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {success}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleCreatePassword}>
                    <TextField
                      fullWidth
                      label="New Password"
                      type="text"
                      value={newPassword.newPassword}
                      onChange={(e) => setNewPassword({ ...newPassword, newPassword: e.target.value })}
                      margin="normal"
                      required
                      autoComplete="email"
                    />
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword.confirmPassword}
                      onChange={(e) => setNewPassword({ ...newPassword, confirmPassword: e.target.value })}
                      margin="normal"
                      required
                      autoComplete="current-password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((prev) => !prev)}
                              edge="end"
                              aria-label="toggle password visibility"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Box>
                </CardContent>
              ) : (
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" component="h1" gutterBottom align="center">
                    Admin Login
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 3 }}
                  >
                    Sign in to access the admin portal
                  </Typography>

                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      autoComplete="email"
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                      required
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, py: 1.5 }}
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </Box>
                </CardContent>
              )
            }
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
}


