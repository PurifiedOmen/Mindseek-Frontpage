import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Signup from './components/Signup';
import './index.css';

function App() {
	const [activeId, setActiveId] = useState('home');
	const navigate = useNavigate();

	useEffect(() => {
		const ids = ['home', 'features', 'pricing', 'about', 'contact'];
		const observerOptions = {
			root: null,
			rootMargin: '0px 0px -40% 0px',
			threshold: [0, 0.25, 0.5, 0.75, 1],
		};

		const obs = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id);
					// update url without jumping
					try {
						window.history.replaceState(null, '', `#${entry.target.id}`);
					} catch (e) {}
				}
			});
		}, observerOptions);

		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		});

		return () => obs.disconnect();
	}, []);

	function scrollToId(e, id) {
		if (e && e.preventDefault) e.preventDefault();
		const el = document.getElementById(id);
		if (!el) {
			// If the element doesn't exist on the current route, navigate to the homepage
			// and attempt to scroll after the route mounts.
			navigate('/');
			setTimeout(() => {
				const el2 = document.getElementById(id);
				if (el2) {
					el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
					el2.focus({ preventScroll: true });
					try { window.history.pushState(null, '', `#${id}`); } catch (e) {}
					setActiveId(id);
				}
			}, 80);
			return;
		}
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		el.focus({ preventScroll: true });
		try {
			window.history.pushState(null, '', `#${id}`);
		} catch (e) {}
		setActiveId(id);
	}

	return (
		<div className="msai-app">
			<Navbar activeId={activeId} onNavClick={scrollToId} />

			<Routes>
				<Route path="/" element={(
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

						{/* Pricing removed — service is completely free for students */}

						<Section id="about" title="About">
							<p>MindSupportAi provides AI-assisted counseling and on-demand micro-support designed specifically for college students. It complements campus mental health services by offering confidential, immediate support around the clock.</p>
						</Section>

						<Section id="contact" title="Contact & Sign up">
							<form className="msai-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks — demo signup simulated.'); }}>
								<label>
									Email
									<input name="email" type="email" placeholder="your@company.com" required />
								</label>
								<label>
									Message
									<textarea name="message" placeholder="How can we help?" rows={4} />
								</label>
								<div className="form-actions">
									<button className="btn btn-primary" type="submit">Request demo</button>
									<button className="btn btn-ghost" type="button" onClick={(e) => scrollToId(e, 'features')}>Back to features</button>
								</div>
							</form>
						</Section>
					</main>
				)} />

				<Route path="/signup" element={<Signup />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;

