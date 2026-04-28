import apiClient from '../lib/apiClient';

export async function getAnalytics(params: Record<string, unknown>) {
  return apiClient.get('/analytics', { params });
}
