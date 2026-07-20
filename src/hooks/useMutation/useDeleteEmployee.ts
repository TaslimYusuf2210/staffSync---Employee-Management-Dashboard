import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteEmployee } from '../../services/dashboard/employee';

export const useDeleteEmployee = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      toast.success('Employee deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};
