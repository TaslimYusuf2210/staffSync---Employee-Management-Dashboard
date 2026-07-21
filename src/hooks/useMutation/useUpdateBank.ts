import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateEmployeeBank } from '../../services/dashboard/employee';
import type { EmployeeBankAccount } from '../../types/dashboard/employee';

export const useUpdateBank = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmployeeBankAccount) =>
      updateEmployeeBank(employeeId, payload),
    onSuccess: () => {
      toast.success('Bank account updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update bank account.');
    },
  });
};
