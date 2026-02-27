'use client';

import axios from 'axios';
import { authCookies } from './authCookies';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important: This ensures cookies are sent with requests
});

api.interceptors.request.use((config) => {
  const token = authCookies.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


