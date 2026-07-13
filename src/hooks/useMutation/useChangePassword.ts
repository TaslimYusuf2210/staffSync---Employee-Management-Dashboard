import { useMutation } from '@tanstack/react-query';
import { changePassword } from '../../services/auth';
import { toast } from 'sonner';

export const useChangePassword = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!');
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
