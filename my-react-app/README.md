# MindSupportAi — 24/7 AI counseling for college students

This is a small React + Vite demo for MindSupportAi: a free, 24/7 AI counseling and micro-support experience aimed at college students. The repo includes a single-page homepage with smooth in-page navigation and a route-based signup page with client-side validation and a mock signup API.

Quick status
- Service copy updated to reflect a free 24/7 counseling offering for students.
- Signup page is a full sign-up form (name, email, password, confirm) with client-side validation, show/hide toggle, and a password strength meter.
- The app uses a small mock API for signup located at `src/api/mockAuth.js` (simulates success and some failure cases for development).

Prerequisites
- Node.js (v18+ recommended; this workspace used Node v24).
- npm (comes with Node). If you don't have Node, install from https://nodejs.org/

Run (Windows PowerShell)
1. Install dependencies (only the first time):
```powershell
cd 'c:\Mindseek Frontpage\my-react-app'
npm install
```

2. Start the dev server (Vite). Vite will print a Local URL (e.g. `http://localhost:5173/` or a nearby port). Open that URL in your browser.
```powershell
npm run dev
# or force a specific port (useful if you want 5176):
npx vite --host --port 5176
```

Notes about ports
- Vite may automatically choose a different `517x` port if the preferred port is in use. Always open the exact Local URL printed by the dev server.

Testing
- Unit tests for the validation utilities are provided and run with Vitest:
```powershell
npm run test
```

Mock signup API behavior
- The mock signup implementation is in `src/api/mockAuth.js` and is only for local/dev testing.
- It simulates failures when the email contains the substring `fail` or `exists` so you can test error states quickly.

Files of interest
- `src/App.jsx` — main app, routing, and in-page scrolling logic
- `src/components/Signup.jsx` — signup form, validation hooks, strength meter
- `src/utils/validation.js` — validation helpers and password strength
- `src/api/mockAuth.js` — simple mock server for signup

Backups and commits
- A ZIP backup was created at `c:\Mindseek Frontpage\my-react-app-backup.zip` containing the project snapshot.
- I did not perform any Git commits in this environment. If you want a commit, run the following locally after confirming you have Git installed:
```powershell
cd 'c:\Mindseek Frontpage\my-react-app'
git init
git add .
git commit -m "Save: MindSupportAi homepage and signup changes"
```

Security & next steps
- This project is a demo. Do not use the mock API or client-side-only auth in production.
- Next steps you might want me to do: wire the signup form to a real backend, add stronger password UX, or add accessibility/a11y improvements.

If you want anything changed in the README or want me to add a short CONTRIBUTING or DEPLOY section, tell me which and I'll update it.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
