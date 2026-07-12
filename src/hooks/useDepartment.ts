import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '../services/dashboard/department';

export const useDepartment = () => {
  return useQuery({
    queryKey: ['departments'],
    queryFn: getDepartments,
  });
}