import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createDepartments} from '../../services/dashboard/department';
import {toast} from 'sonner';

export const useCreateDepartment = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartments,
    onSuccess: () => {
      toast.success('Department created successfully!');
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    },
  });
};