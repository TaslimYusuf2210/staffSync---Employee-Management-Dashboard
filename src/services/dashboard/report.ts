import { request } from '../api';
import type { SalarySummary, EmployeeCountResponse } from '../../types/dashboard/report';

export const getSalarySummary = () =>
  request<SalarySummary>('/reports/salary-summary', {
    method: 'GET',
  });

export const getEmployeeCount = () =>
  request<EmployeeCountResponse>('/departments/employee-count', {
    method: 'GET',
  });
