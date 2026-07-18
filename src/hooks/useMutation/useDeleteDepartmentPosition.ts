import { useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from 'sonner';
import {deleteDepartmentPosition} from '../../services/dashboard/department';

export const useDeleteDepartmentPosition = (departmentId: string, options?: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (positionId: string) => deleteDepartmentPosition(departmentId, positionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departmentPositions', departmentId] });
            options?.onSuccess?.();
            toast.success('Position deleted successfully!');
        },
        onError: () => {
            toast.error('Failed to delete position');
        }
    });
};