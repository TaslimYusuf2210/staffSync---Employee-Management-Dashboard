import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addEmployeeDocument } from '../../services/dashboard/employee';

export const useAddDocument = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof addEmployeeDocument>[1]) =>
      addEmployeeDocument(employeeId, payload),
    onSuccess: () => {
      toast.success('Document added!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add document.');
    },
  });
};
