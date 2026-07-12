import { request } from '../api';
import type { DepartmentsResponse } from '../../types/dashboard/department';

export const getDepartments = () =>
  request<DepartmentsResponse>('/departments', {
    method: 'GET',
  });