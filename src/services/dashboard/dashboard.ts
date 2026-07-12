import { request } from '../api';
import type { DashboardStats } from '../../types/dashboard/dashboard';

export const getDashboardData = () =>
  request<DashboardStats>('/dashboard/stats', {
    method: 'GET',
  });