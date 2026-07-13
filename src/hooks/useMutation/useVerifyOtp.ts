import { useMutation } from '@tanstack/react-query';
import { verifyOtp } from '../../services/auth';
import { toast } from 'sonner';

export const useVerifyOtp = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success('OTP verified successfully!');
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
