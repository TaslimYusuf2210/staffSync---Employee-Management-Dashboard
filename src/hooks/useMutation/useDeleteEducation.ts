import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { request } from '../../services/api';

export const useDeleteEducation = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (educationId: string) =>
      request<any>(`/employees/${employeeId}/education/${educationId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      toast.success('Education record deleted.');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete education record.');
    },
  });
};
