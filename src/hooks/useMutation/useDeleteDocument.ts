import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteEmployeeDocument } from '../../services/dashboard/employee';

export const useDeleteDocument = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) =>
      deleteEmployeeDocument(employeeId, documentId),
    onSuccess: () => {
      toast.success('Document deleted.');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete document.');
    },
  });
};
