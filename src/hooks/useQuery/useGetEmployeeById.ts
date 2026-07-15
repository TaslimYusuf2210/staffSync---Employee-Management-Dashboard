import { useQuery } from '@tanstack/react-query';
import { getEmployeeById } from '@/services/dashboard/employee';
import type { Employee } from '@/types/dashboard/employee';

export const useGetEmployeeById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id!),
    enabled: !!id,
    select: (res) => res.data?.employee,
  });
}

export type UseGetEmployeeByIdData = Employee | undefined;