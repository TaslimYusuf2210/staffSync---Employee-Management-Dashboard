import {useMutation} from '@tanstack/react-query';
import {createDepartments} from '../../services/dashboard/department';
import {toast} from 'sonner';

export const useCreateDepartment = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: createDepartments,
    onSuccess: () => {
      toast.success('Department created successfully!');
      options?.onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'An error occurred. Please try again.');
    }
    });
};