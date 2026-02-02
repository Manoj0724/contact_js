# contact_js

This repository contains two frontends:

- `legacy/contacts/` — the original DOM-based TypeScript UI (archived). Do not edit; used for reference.
- `contacts-frontend/` — the active Angular application (preferred). Run it during development:

```bash
cd contacts-frontend
npm install
npm start   # starts dev server with /api proxied to the backend
```

Backend server (APIs) is in `backend/` and runs on port 5000. To serve the Angular production build from the backend, run `ng build --configuration production` inside `contacts-frontend/` and the backend will serve `dist/contacts-frontend`.
