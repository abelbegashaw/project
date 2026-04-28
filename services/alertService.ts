import apiClient from '../lib/apiClient';

export async function getAlerts() {
  return apiClient.get('/alerts');
}
