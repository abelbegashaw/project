import apiClient from '../lib/apiClient';

export async function getComments(params: Record<string, unknown>) {
  return apiClient.get('/comments', { params });
}
