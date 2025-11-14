import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Signup from './components/Signup';
import MindSeekChatbot from './components/MindSeekChatbot';
import './index.css';

function App() {
  const [activeId, setActiveId] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll-based section highlighting
  useEffect(() => {
    const ids = ['home', 'features', 'about', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
          try { window.history.replaceState(null, '', `#${entry.target.id}`); } catch {}
        }
      });
    }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: [0,0.25,0.5,0.75,1] });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Update activeId for route links
  useEffect(() => {
    if (location.pathname === '/signup') setActiveId('signup');
    else if (location.pathname === '/ai-demo') setActiveId('ai-demo');
  }, [location]);

  // Scroll to section
  function scrollToId(e, id) {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (!el) {
      navigate('/');
      setTimeout(() => {
        const el2 = document.getElementById(id);
        if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
      }, 80);
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  }

  return (
    <div className="msai-app">
      <Navbar activeId={activeId} onNavClick={scrollToId} />

      <Routes>
        <Route path="/" element={
          <main>
            <Hero
              onPrimaryClick={(e) => scrollToId(e, 'contact')}
              onSecondaryClick={(e) => scrollToId(e, 'features')}
            />
            <Section id="features" title="Features">
              <ul className="feature-list">
                <li><strong>Micro-practices:</strong> One-minute resets and pairing check-ins.</li>
                <li><strong>Workflows:</strong> Team-friendly rituals for async-heavy orgs.</li>
                <li><strong>Privacy-first:</strong> No persistent personal tracking by default.</li>
              </ul>
            </Section>
            <Section id="about" title="About">
              <p>MindSupportAi provides AI-assisted counseling and on-demand micro-support designed for students. Confidential and immediate support around the clock.</p>
            </Section>
            <Section id="contact" title="Contact & Sign up">
              <form className="msai-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks — demo signup simulated.'); }}>
                <label>Email<input name="email" type="email" required /></label>
                <label>Message<textarea name="message" rows={4} /></label>
                <div className="form-actions">
                  <button className="btn btn-primary" type="submit">Request demo</button>
                  <button className="btn btn-ghost" type="button" onClick={(e) => scrollToId(e, 'features')}>Back to features</button>
                </div>
              </form>
            </Section>
          </main>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai-demo" element={<MindSeekChatbot />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
