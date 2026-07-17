import { getDepartmentById } from '../../services/dashboard/department';
import { useQuery } from '@tanstack/react-query';

export const useGetDepartmentById = (id: string | undefined) => {
    return useQuery({
        queryKey: ['department', id],
        queryFn: () => getDepartmentById(id!),
        enabled: !!id,
    });
};