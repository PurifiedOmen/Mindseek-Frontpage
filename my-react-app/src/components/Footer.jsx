import React from 'react';

export default function Footer() {
  return (
    <footer className="msai-footer">
      <div className="msai-footer-inner">
        <p>© {new Date().getFullYear()} MindSupportAi — 24/7 Counseling Support for College Students.</p>
        <p className="muted">Designed with student privacy and accessibility in mind.</p>
      </div>
    </footer>
  );
}
