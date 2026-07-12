import { request } from '../api';
import type { Department } from '../../types/dashboard/department';

export const getDepartments = () =>
  request<Department[]>('/departments', {
    method: 'GET',
  });