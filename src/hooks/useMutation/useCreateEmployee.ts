import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import { createEmployee } from '../../services/dashboard/employee';

export const useCreateEmployee = (options?: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
          toast.success('Employee created successfully!');
          queryClient.invalidateQueries({ queryKey: ['employees'] });
          options?.onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(error?.message || 'An error occurred. Please try again.');
        },
      });
    }