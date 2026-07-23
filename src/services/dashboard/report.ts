import { request } from '../api';
import type { SalarySummary } from '../../types/dashboard/report';

export const getSalarySummary = () =>
  request<SalarySummary>('/reports/salary-summary', {
    method: 'GET',
  });
