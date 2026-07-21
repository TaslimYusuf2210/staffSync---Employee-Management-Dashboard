import { request } from '../api';
import type { EmployeesResponse, SingleEmployeeResponse, EmployeeQueryParams, CreateEmployeePayload, UpdateEmployeePayload, Education } from '../../types/dashboard/employee';

export const getEmployees = (params?: EmployeeQueryParams) =>
  request<EmployeesResponse>('/employees', {
    method: 'GET',
    params: params as Record<string, unknown>,
  });

export const getEmployeeById = (id: string) =>
  request<SingleEmployeeResponse>(`/employees/${id}`, {
    method: 'GET',
  });

export const createEmployee = (payload: CreateEmployeePayload) =>
  request<any>('/employees', {
    method: 'POST',
    data: payload,
  });

export const deleteEmployee = (id: string) =>
  request<any>(`/employees/${id}`, {
    method: 'DELETE',
  });

export const addEmployeeEducation = (id: string, payload: Omit<Education, 'id'>) =>
  request<any>(`/employees/${id}/education`, {
    method: 'POST',
    data: payload,
  });

export const updateEmployee = (id: string, payload: UpdateEmployeePayload) =>
  request<any>(`/employees/${id}`, {
    method: 'PUT',
    data: payload,
  });