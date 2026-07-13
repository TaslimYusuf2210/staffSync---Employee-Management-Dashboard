import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../services/dashboard/employee';
import type { EmployeeQueryParams } from '@/types/dashboard/employee'

export const useGetEmployees = (params?: EmployeeQueryParams) => {
  return useQuery({
    queryKey: ['employees', params],
    queryFn: () => getEmployees(params),
    placeholderData: (previousData) => previousData,
  });
}