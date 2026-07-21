import { useQuery } from '@tanstack/react-query';
import { getEmployeeById } from '@/services/dashboard/employee';
import type { Employee } from '@/types/dashboard/employee';

export const useGetEmployeeById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id!),
    enabled: !!id,
    select: (res) => {
      if (!res.data?.employee) return undefined;
      return {
        ...res.data.employee,
        salary: res.data.Salary ?? res.data.employee.salary,
        bankAccount: res.data.BankAccount ?? res.data.employee.bankAccount,
        education: res.data.Education ?? res.data.employee.education,
        documents: res.data.Documents ?? res.data.employee.documents,
        notes: res.data.Notes ?? res.data.employee.notes,
      } as Employee;
    },
    refetchOnMount: true,
  });
}

export type UseGetEmployeeByIdData = Employee | undefined;