import { useQuery } from '@tanstack/react-query';
import { getSalarySummary } from '../../services/dashboard/report';

export const useGetSalarySummary = () => {
  return useQuery({
    queryKey: ['salarySummary'],
    queryFn: getSalarySummary,
    select: (res) => res.data,
  });
};
