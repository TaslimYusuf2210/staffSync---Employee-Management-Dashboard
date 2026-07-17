import {getDepartmentPositions} from '../../services/dashboard/department';
import {useQuery} from '@tanstack/react-query';

export const useGetDepartmentPositions = (id: string | undefined) => {
    return useQuery({
        queryKey: ['departmentPositions', id],
        queryFn: () => getDepartmentPositions(id),
        enabled: !!id,
    });
};