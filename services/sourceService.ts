

import apiClient from '../lib/apiClient';
import { Source } from '../types';

export async function getSources() {
  return apiClient.get<Source[]>('/sources');
}

export async function addSource(data: Source) {
  return apiClient.post<Source>('/sources', data);
}

export async function updateSource(id: string, data: Source) {
  return apiClient.put<Source>(`/sources/${id}`, data);
}

export async function deleteSource(id: string) {
  return apiClient.delete(`/sources/${id}`);
}
