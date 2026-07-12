import { request } from './api';
import type { CurrentUserResponse, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse, SendOtpPayload, VerifyOtpPayload, ChangePasswordPayload } from '../types/auth';

export const registerAccount = (payload: RegisterPayload) =>
  request<RegisterResponse>('/auth/register', {
    method: 'POST',
    data: payload,
  });

export const sendOtp = (payload: SendOtpPayload) =>
  request<{ message: string }>('/auth/send-otp', {
    method: 'POST',
    data: payload,
  });

export const verifyOtp = (payload: VerifyOtpPayload) =>
  request<{ message: string }>('/auth/verify-otp', {
    method: 'POST',
    data: payload,
  });

export const login = (payload: LoginPayload) =>
  request<LoginResponse>('/auth/login', {
    method: 'POST',
    data: payload,
  });

export const getCurrentUser = () =>
  request<CurrentUserResponse>('/auth/me', {
    method: 'GET',
  });

export const changePassword = (payload: ChangePasswordPayload) =>
  request<{ message: string }>('/auth/change-password', {
    method: 'PUT',
    data: payload,
});

