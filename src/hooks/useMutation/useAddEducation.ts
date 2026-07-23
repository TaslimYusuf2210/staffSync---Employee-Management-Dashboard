import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addEmployeeEducation } from '../../services/dashboard/employee';

export const useAddEducation = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof addEmployeeEducation>[1]) =>
      addEmployeeEducation(employeeId, payload),
    onSuccess: () => {
      toast.success('Education record added!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add education record.');
    },
  });
};
