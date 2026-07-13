import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/dashboard/settings';
import { toast } from 'sonner';

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success('Company information updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
