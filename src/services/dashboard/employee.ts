import { request } from '../api';
import type { EmployeesResponse, EmployeeQueryParams } from '../../types/dashboard/employee';

export const getEmployees = (params?: EmployeeQueryParams) =>
  request<EmployeesResponse>('/employees', {
    method: 'GET',
    params: params as Record<string, unknown>,
  });