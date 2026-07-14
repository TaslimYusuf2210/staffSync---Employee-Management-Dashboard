import { request } from '../api';
import type { EmployeesResponse, EmployeeQueryParams, CreateEmployeePayload } from '../../types/dashboard/employee';

export const getEmployees = (params?: EmployeeQueryParams) =>
  request<EmployeesResponse>('/employees', {
    method: 'GET',
    params: params as Record<string, unknown>,
  });

export const createEmployee = (payload: CreateEmployeePayload) =>
  request<any>('/employees', {
    method: 'POST',
    data: payload,
  });