
// MOCKED login for frontend development (no backend required)
export async function login(email: string, password: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Always "succeed" with a full user object
  return {
    data: {
      token: 'mock-token',
      user: {
        id: '1',
        name: 'Admin User',
        email,
        role: 'admin',
        workspaceId: 'workspace-1',
      },
    },
  };
}

export async function logout() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 200));
  return { data: {} };
}
