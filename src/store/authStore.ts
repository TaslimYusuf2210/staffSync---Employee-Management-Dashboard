import { create } from 'zustand';

const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: storedToken || null,
  setToken: (token) => set({ token }),
}));