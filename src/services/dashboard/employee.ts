import { request } from '../api';

export const getEmployees = () =>
  request('/employees', {
    method: 'GET',
  });