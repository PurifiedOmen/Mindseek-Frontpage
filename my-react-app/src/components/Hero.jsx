import React from 'react';

export default function Hero({ onPrimaryClick, onSecondaryClick }) {
  return (
    <section id="home" className="msai-hero" tabIndex={-1} aria-labelledby="hero-heading">
      <div className="msai-hero-inner">
        <h1 id="hero-heading">MindSupportAi — 24/7 AI counseling for college students</h1>
        <p className="msai-lead">Confidential, evidence-informed counseling and micro‑support for students — available anytime, anywhere.</p>
        <div className="msai-hero-cta">
          <button className="btn btn-primary" onClick={(e) => onPrimaryClick(e)}>Get started</button>
          <button className="btn btn-ghost" onClick={(e) => onSecondaryClick(e)}>Learn more</button>
        </div>
      </div>
    </section>
  );
}
