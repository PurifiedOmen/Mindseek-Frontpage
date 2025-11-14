import React from 'react';
import { Link } from 'react-router-dom';

const navItems = [
  { id: 'home', label: 'Home', type: 'scroll' },
  { id: 'features', label: 'Features', type: 'scroll' },
  { id: 'about', label: 'About', type: 'scroll' },
  { id: 'contact', label: 'Contact', type: 'scroll' },
  { id: 'ai-demo', label: 'AI Demo', type: 'route', path: '/ai-demo' },
  { id: 'signup', label: 'Sign up', type: 'route', path: '/signup' },
];

export default function Navbar({ activeId, onNavClick }) {
  return (
    <header className="msai-nav">
      <div className="msai-nav-inner">
        <a
          className="msai-logo"
          href="#home"
          onClick={(e) => onNavClick(e, 'home')}
        >
          MindSupportAi
        </a>
        <nav aria-label="Main navigation">
          <ul className="msai-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.type === 'scroll' ? (
                  <a
                    href={`#${item.id}`}
                    className={"msai-nav-link " + (activeId === item.id ? 'active' : '')}
                    onClick={(e) => onNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={"msai-nav-link " + (activeId === item.id ? 'active' : '')}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
