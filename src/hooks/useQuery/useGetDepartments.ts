import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../../services/dashboard/department';

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
    select: (res) => res.data?.departments,
  });
}