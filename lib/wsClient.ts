// Placeholder for WebSocket client setup
// Use this to connect to backend for real-time alerts/updates

export function createWebSocketClient(url: string) {
  const ws = new WebSocket(url);
  ws.onopen = () => console.log('WebSocket connected');
  ws.onclose = () => console.log('WebSocket disconnected');
  ws.onerror = (e) => console.error('WebSocket error', e);
  return ws;
}
