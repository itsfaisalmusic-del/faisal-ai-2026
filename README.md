# FAISAL AI — Starter v1.0

Mobile-friendly PWA starter with:
- Chat interface (local demo replies, **not** a connected LLM)
- Two-image side-by-side composition, text overlay and PNG download
- Video upload, preview and playback of a selected time range (no edited export yet)
- Browser speech recognition and text-to-speech where supported
- Installable PWA shell / offline caching

## Run locally
Open `index.html` in a modern browser, or serve this folder using a local static server. Microphone and service-worker features generally require HTTPS or localhost.

## Publish free with GitHub Pages (Android phone)
1. Sign in to GitHub in Chrome.
2. Create a **public** repository named `faisal-ai`.
3. Choose **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, and `README.md` (upload the files, not the ZIP).
5. Commit changes.
6. Open **Settings → Pages**.
7. Under Build and deployment choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
8. Wait for the Pages URL shown there, usually `https://YOUR-USERNAME.github.io/faisal-ai/`.

## Install on Android
1. Open the live HTTPS GitHub Pages URL in Chrome.
2. Chrome menu ⋮ → **Add to Home screen** or **Install app**.
3. Launch FAISAL AI from the home screen.

## APK note
This project is a PWA, not a compiled native APK. For an APK, first publish it over HTTPS, then use PWABuilder (https://www.pwabuilder.com/) to package the PWA as an Android app. Follow its current Android/TWA requirements. Signing and store distribution may require extra setup. Do not upload private signing keys to GitHub.

## What is not connected yet
- Chat uses simple local demo replies, not ChatGPT.
- Photo tools are manual compositing, not AI image generation or automatic background/object removal.
- Video currently previews and plays a selected range; it does not render/export a trimmed MP4.
- Voice depends on browser speech APIs and language availability.

## Safe next upgrade
Add a small server-side API endpoint for an AI model. Keep API keys on the server (environment secrets), never in `app.js`, HTML, or a public GitHub repository. Check provider pricing and free-tier limits before connecting.
