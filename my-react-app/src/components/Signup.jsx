import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordStrength, validateSignup } from '../utils/validation';
import { signup as mockSignup } from '../api/mockAuth';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  function handleToggleShow() {
    setShow(!show);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = validateSignup({ name, email, password, confirm });
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setSubmitting(true);
    try {
      const resp = await mockSignup({ name, email, password });
      setSubmitting(false);
      if (!resp.ok) {
        setError(resp.error || 'Signup failed');
        return;
      }
      alert('Account created — welcome to MindSupportAi (simulation).');
      navigate('/');
    } catch (err) {
      setSubmitting(false);
      setError('Network error — please try again.');
    }
  }

  return (
    <main className="msai-section msai-signup" id="signup">
      <div className="msai-section-inner">
        <h2>Sign up for MindSupportAi</h2>
        <p className="muted">Create a student account to access 24/7 AI counseling and support.</p>

        <form className="msai-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full name
            <input
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="password-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>Password</span>
              <small className="muted">Minimum 8 characters</small>
            </div>
            <div className="password-input-wrap">
              <input
                name="password"
                type={show ? 'text' : 'password'}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button type="button" className="btn btn-ghost show-toggle" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-label={show ? 'Hide password' : 'Show password'}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="pwd-strength">
              <StrengthMeter password={password} />
            </div>
          </label>

          <label>
            Confirm password
            <input
              name="confirm"
              type={show ? 'text' : 'password'}
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </label>

          {error && <div role="alert" style={{ color: 'var(--error, #ff7b7b)', marginTop: 6 }}>{error}</div>}

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Create account'}</button>
            <button className="btn btn-ghost" type="button" onClick={() => navigate('/')}>Back to home</button>
          </div>
        </form>
      </div>
    </main>
  );
}

function StrengthMeter({ password }) {
  const { score, label } = passwordStrength(password);
  const pct = Math.min(100, (score / 4) * 100);
  return (
    <div className="strength-meter" aria-hidden>
      <div className="strength-bar" style={{ width: `${pct}%` }} />
      <div className="strength-label">{label}</div>
    </div>
  );
}

