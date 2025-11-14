import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ activeId, onNavClick }) {
  return (
    <header className="msai-nav">
      <div className="msai-nav-inner">
        <a className="msai-logo" href="#home" onClick={(e) => onNavClick(e, 'home')}>MindSupportAi</a>
        <nav aria-label="Main navigation">
          <ul className="msai-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={"msai-nav-link " + (activeId === item.id ? 'active' : '')}
                  onClick={(e) => onNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/signup" className="msai-nav-link msai-cta">Sign up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
