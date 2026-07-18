import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateDepartment } from "../../services/dashboard/department";
import type { CreateDepartmentPayload } from "../../types/dashboard/department";

export const useUpdateDepartment = (departmentId: string, options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (payload: Partial<CreateDepartmentPayload>) => updateDepartment(departmentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
      options?.onSuccess?.();
      toast.success('Department updated successfully!');
    },
  });
  return { mutateAsync };
};