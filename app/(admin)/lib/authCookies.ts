'use client';

import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token_admin';
const USER_KEY = 'auth_user_admin';
const ACCESS_KEY = 'auth_access_admin';

const maxAgeMilliseconds = 1000 * 60 * 60 * 2; // 2 hours in milliseconds
// Calculate expiration date (current time + 2 hours)
const expiresAt = new Date(Date.now() + maxAgeMilliseconds);

export const authCookies = {
  // ---------- TOKEN ----------
  getToken: () => {
    if (typeof window === 'undefined') return null;
    return Cookies.get(TOKEN_KEY) || null;
  },

  setToken: (token: string) => {
    if (typeof window === 'undefined') return;

    Cookies.set(TOKEN_KEY, token, {
      sameSite: 'lax',
      secure: false, // set true in production with HTTPS
      path: '/',
      expires: expiresAt,
    });
  },

  clearToken: () => {
    if (typeof window === 'undefined') return;
    Cookies.remove(TOKEN_KEY, { path: '/' });
  },

  // ---------- USER ----------
  getUser: <T = any>() => {
    if (typeof window === 'undefined') return null;

    const user = Cookies.get(USER_KEY);
    if (!user) return null;

    try {
      return JSON.parse(user) as T;
    } catch (error) {
      console.error('Failed to parse user cookie', error);
      return null;
    }
  },

  setUser: (user: any) => {
    if (typeof window === 'undefined') return;

    Cookies.set(USER_KEY, JSON.stringify(user), {
      sameSite: 'lax',
      secure: false,
      path: '/',
      expires: expiresAt,
    });
  },

  clearUser: () => {
    if (typeof window === 'undefined') return;
    Cookies.remove(USER_KEY, { path: '/' });
  },
  getAccess: (): string[] => {
    if (typeof window === 'undefined') return [];
    const access = Cookies.get(ACCESS_KEY);
    return access ? JSON.parse(access) : [];
  },
  setAccess: (access: string[]) => {
    if (typeof window === 'undefined') return;
    Cookies.set(ACCESS_KEY, JSON.stringify(access), {
      sameSite: 'lax',
      secure: false,
      path: '/',
      expires: expiresAt,
    });
  },

  clearAccess: () => {
    if (typeof window === 'undefined') return;
    Cookies.remove(ACCESS_KEY, { path: '/' });
  },
};
