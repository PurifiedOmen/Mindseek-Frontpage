// Simple mock signup API. Replace with real backend calls in production.
export async function signup({ name, email, password }) {
  // simulate network delay
  await new Promise((r) => setTimeout(r, 600));

  // Simulate failure cases for testing
  if (email.includes('fail')) {
    return { ok: false, status: 400, error: 'Simulated server error for this email' };
  }
  if (email.includes('exists')) {
    return { ok: false, status: 409, error: 'Account already exists' };
  }

  // success
  return { ok: true, status: 201, data: { id: Math.floor(Math.random() * 100000), name, email } };
}
