'use client';

import api from './apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
  login: boolean,
  access: any
}

export interface CreatePasswordPayload {
  email: string,
  password: string
}

export interface CreatePasswordResponse {
  success: boolean,
  message: string
}

export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', payload);
    const data = response.data;
    console.log('Login response:', data);

    // Handle different response structures
    const token = data.token || data.access_token || data.accessToken;
    const user = data.user;
    let login = data.login != undefined ? data.login : true
    let access = data.access != undefined ? data.access : true
    if (login && !token) {
      console.error('No token found in response:', data);
      throw new Error('No token received from server');
    }

    return {
      token,
      user: user || {
        id: '',
        email: payload.email,
      },
      login,
      access
    };
  },
  createPassword: async (payload: CreatePasswordPayload): Promise<CreatePasswordResponse> => {
    const response = await api.post('/auth/complete-invitation', payload);
    const data = response.data;
    let success = data.success != undefined ? data.success : false
    if (!success) {
      throw new Error('Something went wrong');
    }

    return {
      success,
      message: data.message
    };
  }
};


