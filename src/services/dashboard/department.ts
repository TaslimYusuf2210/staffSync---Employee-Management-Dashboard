import { request } from '../api';
import type { DepartmentsResponse, CreateDepartmentPayload, SingleDepartmentData, DepartmentPositionsData, CreateDepartmentPositionItem } from '../../types/dashboard/department';

export const getDepartments = () =>
  request<DepartmentsResponse>('/departments', {
    method: 'GET',
  });

export const createDepartments = (payload: CreateDepartmentPayload) =>
  request<any>('/departments', {
    method: 'POST',
    data: payload
  });

export const createDepartmentPositions = (departmentId: string, payload: CreateDepartmentPositionItem) =>
  request<any>(`/departments/${departmentId}/positions`, {
    method: 'POST',
    data: payload
  });

export const getDepartmentById = (id: string) =>
  request<SingleDepartmentData>(`/departments/${id}`, {
    method: 'GET',
  });

export const getDepartmentPositions = (id: string | undefined) =>
  request<DepartmentPositionsData>(`/departments/${id}/positions`, {
    method: 'GET',
  });

export const updateDepartment = (id: string, payload: Partial<CreateDepartmentPayload>) =>
  request<any>(`/departments/${id}`, {
    method: 'PUT',
    data: payload
  });