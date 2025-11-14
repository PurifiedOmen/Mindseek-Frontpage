export function passwordStrength(password) {
  let score = 0;
  if (!password) return { score, label: 'Empty' };
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  const label = score <= 1 ? 'Weak' : score === 2 ? 'Fair' : score === 3 ? 'Good' : 'Strong';
  return { score, label };
}

export function validateSignup({ name, email, password, confirm }) {
  if (!name || !name.trim()) return { ok: false, error: 'Please enter your full name.' };
  if (!email || !email.trim()) return { ok: false, error: 'Please enter your email address.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (!password || password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  if (password !== confirm) return { ok: false, error: 'Passwords do not match.' };
  return { ok: true };
}
