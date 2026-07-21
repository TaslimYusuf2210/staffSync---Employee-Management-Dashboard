import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployeeSalary } from '../../services/dashboard/employee';
import type { UpdateSalaryPayload } from '../../types/dashboard/employee';

export const useUpdateSalary = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSalaryPayload) =>
      updateEmployeeSalary(employeeId, payload),
    onSuccess: () => {
      toast.success('Salary updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update salary.');
    },
  });
};
