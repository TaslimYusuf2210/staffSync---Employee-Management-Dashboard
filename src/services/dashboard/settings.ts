import { request } from '../api';
import type { Settings } from '@/types/dashboard/settings';

export const updateSettings = (payload: Settings) =>
  request('/settings/company', {
    method: 'PUT',
    data: payload,
  });