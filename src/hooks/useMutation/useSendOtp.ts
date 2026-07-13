import { useMutation } from '@tanstack/react-query';
import { sendOtp } from '../../services/auth';
import { toast } from 'sonner';

export const useSendOtp = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success('OTP sent successfully! Please check your email.');
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
