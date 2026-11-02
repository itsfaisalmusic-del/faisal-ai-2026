# FAISAL AI V2.0

Mobile-first Progressive Web App starter for the FAISAL AI project.

## Included
- Premium dark/purple responsive dashboard
- Chat UI with local chat history (saved in this browser)
- Optional `/api/chat` endpoint hook (falls back to clearly labelled demo mode)
- Two-photo canvas composition, title overlay and PNG export
- Video upload, preview and selected-range playback
- Browser speech recognition and text-to-speech where supported
- PWA manifest and offline static-asset cache

## Important capability notes
This package does **not** include a live AI model connection, AI image generation, background removal, or trimmed MP4 export. The chat tries `POST /api/chat`; if no backend is configured, it uses local demo replies. No API key belongs in `app.js`, `index.html`, or any public repository.

## Deploy
Upload the files in this folder to the root of the existing static-site project/repository:
`index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, and `README.md`.

Commit the changes and let the existing Cloudflare deployment finish. Keep your existing project URL and settings.

## Connect a real AI backend
Configure a secure server-side endpoint at `/api/chat` that accepts JSON `{ "message": "...", "history": [...] }` and returns JSON `{ "reply": "..." }`. Store provider credentials as server-side secrets only. The browser code is already prepared to call this endpoint, but the backend is not included/configured in this static package.

## Test
1. Open the live site in Chrome on Android.
2. Send a test message. Without `/api/chat`, the page should indicate DEMO MODE and return a local demo response.
3. Test Photo Studio PNG export.
4. Test video preview and voice support.
5. If an old version remains visible, refresh the site or clear the site's cached data after confirming the new deployment is live.
