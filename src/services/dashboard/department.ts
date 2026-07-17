import { request } from '../api';
import type { DepartmentsResponse, CreateDepartmentPayload, SingleDepartmentData } from '../../types/dashboard/department';

export const getDepartments = () =>
  request<DepartmentsResponse>('/departments', {
    method: 'GET',
  });

export const createDepartments = (payload: CreateDepartmentPayload) =>
  request<any>('/departments', {
    method: 'POST',
    data: payload
  });

export const getDepartmentById = (id: string) =>
  request<SingleDepartmentData>(`/departments/${id}`, {
    method: 'GET',
  });