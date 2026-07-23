import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteNote } from '../../services/dashboard/employee';

export const useDeleteNote = (employeeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: string) =>
      deleteNote(employeeId, noteId),
    onSuccess: () => {
      toast.success('Note deleted.');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete note.');
    },
  });
};
