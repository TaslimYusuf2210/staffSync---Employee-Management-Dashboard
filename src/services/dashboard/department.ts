import { request } from '../api';
import type { DepartmentsResponse, CreateDepartmentPayload } from '../../types/dashboard/department';

export const getDepartments = () =>
  request<DepartmentsResponse>('/departments', {
    method: 'GET',
  });

export const createDepartments = (payload: CreateDepartmentPayload) =>
  request<any>('/departments', {
    method: 'POST',
    data: payload
  });