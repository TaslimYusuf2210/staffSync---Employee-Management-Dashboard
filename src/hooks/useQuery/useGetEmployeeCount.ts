import { useQuery } from '@tanstack/react-query';
import { getEmployeeCount } from '../../services/dashboard/report';

export const useGetEmployeeCount = () => {
  return useQuery({
    queryKey: ['employeeCount'],
    queryFn: getEmployeeCount,
    select: (res) => res.data,
  });
};
