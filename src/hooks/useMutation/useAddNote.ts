import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { addNote, type AddNotePayload } from '../../services/dashboard/employee';

export const useAddNote = (employeeId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (payload: AddNotePayload) =>
      addNote(employeeId, payload),
    onSuccess: () => {
      toast.success('Note added!');
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] });
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to add note.');   
    },
  });
};