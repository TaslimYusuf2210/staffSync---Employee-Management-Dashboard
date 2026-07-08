import { request } from './api';
import type { RegisterPayload, RegisterResponse } from '../types/auth';

export const register = (payload: RegisterPayload) =>
  request<RegisterResponse>('/auth/register', {
    method: 'POST',
    data: payload,
  });
