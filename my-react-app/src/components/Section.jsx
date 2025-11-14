import React from 'react';

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="msai-section" tabIndex={-1} aria-labelledby={`${id}-title`}>
      <div className="msai-section-inner">
        <h2 id={`${id}-title`}>{title}</h2>
        <div className="msai-section-content">{children}</div>
      </div>
    </section>
  );
}
