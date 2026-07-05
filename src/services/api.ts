/**
 * API Service — centralized HTTP client.
 *
 * The backend person just needs to update BASE_URL and the
 * real endpoints; everything here is already wired into the forms.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/v1';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

function getToken(): string | null {
  try {
    const raw = localStorage.getItem('staffsync_auth');
    if (!raw) return null;
    return JSON.parse(raw).token ?? null;
  } catch {
    return null;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const body: ApiResponse<T> = await res.json().catch(() => ({
    success: false,
    message: 'Unable to parse server response',
  }));

  if (!res.ok) {
    throw new ApiError(res.status, body.message ?? 'Something went wrong', body.errors);
  }

  return body;
}

// ─── Auth ────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterPayload {
  companyName: string;
  email: string;
  description: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RegisterResponse {
  token: string;
  user: AuthUser;
  company: { id: string; name: string; description: string };
}

export const authApi = {
  login: (payload: LoginPayload) =>
    request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  register: (payload: RegisterPayload) =>
    request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  forgotPassword: (email: string) =>
    request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  changePassword: (payload: { currentPassword: string; newPassword: string; confirmPassword: string }) =>
    request<{ message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
};

// ─── Generic ─────────────────────────────────────────────────────────

/** Convenience export for other API calls the backend will provide. */
export { request, ApiError };
export type { ApiResponse };
