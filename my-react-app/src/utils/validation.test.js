import { describe, it, expect } from 'vitest';
import { validateSignup, passwordStrength } from './validation';

describe('validateSignup', () => {
  it('validates missing name', () => {
    expect(validateSignup({ name: '', email: 'a@b.com', password: 'password', confirm: 'password' }).ok).toBe(false);
  });
  it('validates email format', () => {
    expect(validateSignup({ name: 'x', email: 'bad', password: 'password', confirm: 'password' }).ok).toBe(false);
  });
  it('validates password length', () => {
    expect(validateSignup({ name: 'x', email: 'a@b.com', password: 'short', confirm: 'short' }).ok).toBe(false);
  });
  it('validates password confirm mismatch', () => {
    expect(validateSignup({ name: 'x', email: 'a@b.com', password: 'longenough', confirm: 'different' }).ok).toBe(false);
  });
  it('passes valid input', () => {
    expect(validateSignup({ name: 'x', email: 'a@b.com', password: 'longenough', confirm: 'longenough' }).ok).toBe(true);
  });
});

describe('passwordStrength', () => {
  it('scores empty', () => {
    expect(passwordStrength('').label).toBe('Empty');
  });
  it('scores weak', () => {
    expect(passwordStrength('abcd').label).toBe('Weak');
  });
  it('scores stronger for mixed content', () => {
    expect(passwordStrength('Abcd1234!').label).toBe('Strong');
  });
});
