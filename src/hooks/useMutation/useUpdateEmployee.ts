import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployee } from '../../services/dashboard/employee';
import type { UpdateEmployeePayload } from '../../types/dashboard/employee';

export const useUpdateEmployee = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEmployeePayload) =>
      updateEmployee(employeeId, payload),
    onSuccess: () => {
      toast.success('Employee updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update employee.');
    },
  });
};
