import {useMutation, useQueryClient} from '@tanstack/react-query';
import {toast} from 'sonner';
import {deleteDepartment} from '../../services/dashboard/department';

export const useDeleteDepartment = (id: string, options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => deleteDepartment(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['departments'] });
          options?.onSuccess?.();
            toast.success('Department deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete department');
        }
      });
}