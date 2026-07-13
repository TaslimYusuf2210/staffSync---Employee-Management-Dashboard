import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/auth';
import { toast } from 'sonner';
import type { LoginPayload } from '../../types/auth';

export const useLogin = (options?: { onSuccess?: (data: any, variables: LoginPayload) => void }) => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      if (data?.data?.token) {
        if (variables.rememberMe) {
          localStorage.setItem('token', data.data.token);
        } else {
          sessionStorage.setItem('token', data.data.token);
        }
      }
      options?.onSuccess?.(data, variables);
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
