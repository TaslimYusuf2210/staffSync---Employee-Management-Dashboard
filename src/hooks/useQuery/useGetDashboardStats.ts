import { useQuery } from '@tanstack/react-query';
import { getDashboardData } from '../../services/dashboard/dashboard';

export const useGetDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboardStats'],
        queryFn: getDashboardData,
    });
}