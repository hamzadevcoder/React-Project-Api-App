# Facebook Graph API Explorer Dashboard

A full-stack application built with React and Express that mimics a Facebook Developer Dashboard and integrates seamlessly with the actual Meta Graph API v25.0 to fetch and display live, personalized Facebook account data.

---

## 🏗 Technology Stack

- **Frontend Environment**: Vite + React 18
- **Styling UI**: Tailwind CSS (with Glassmorphism aesthetic and Dark Mode support)
- **Routing**: React Router DOM (v7)
- **Icons**: `lucide-react`
- **State Management**: React Context API (`AuthContext` & `FacebookDataContext`)
- **Backend API**: Node.js + Express
- **API Wrapper**: Axios
- **Authentication**: Meta Facebook Login SDK (OAuth 2.0)

---

## 🚀 Features

1. **Secure Express Proxy Layer**: Handles explicit Meta OAuth code-to-token exchanges purely server-side, protecting your `FB_APP_SECRET`. 
2. **Dynamic Live Data Fetching**: Retrieves real-time user profiles, app friends, timeline posts, uploaded photos, and liked pages directly from Graph API.
3. **Interactive Guided Walkthrough**: Features a dynamic *Helper* component that floats over the UI, offering a 5-step guided tour of live data injections fetched from the Graph API.
4. **Resilient Error Systems**: Maps explicit Graph API network errors (such as missing permission blocks, rate limits, or expired tokens) directly to the UI rendering custom retry nodes.
5. **Robust Mock Environment**: Complete with an extensive layout simulating Facebook Developer Documentation and Application analytics pages.

---

## ⚙️ Deployment & Running Locally

### 1. Requirements
Ensure you are running an LTS release of **Node.js** (v18+). You also must have an active **Meta Developer Account** and a configured App assigned to a business portfolio.

### 2. Environment Variables
You must create a `.env` file at the root of the project to wire your custom Meta App instances to both the Express backend and Vite frontend:

```env
# Exposed to the backend Express server
FB_APP_ID=1259107226290612
FB_APP_SECRET=your_secret_hash_here

# Exposed to Vite's Frontend SDK Initializer
VITE_FB_APP_ID=1259107226290612
VITE_API_BASE_URL=http://localhost:3000/api
```

### 3. Meta Developer App Configuration
Inside your [Meta Developer Dashboard](https://developers.facebook.com/):
- Add the **Facebook Login** product.
- Enter `http://localhost:5173/` as your Valid OAuth Redirect URI.
- Ensure the app has requested advanced access points or is in developer mode for `public_profile`, `email`, `user_friends`, `user_posts`, and `user_photos`.

Use these exact callback URIs in **Facebook Login → Settings → Valid OAuth Redirect URIs**:
- `https://react-project-api-app-production.up.railway.app/auth/facebook/callback`
- `http://localhost:5173/auth/facebook/callback`
- `http://127.0.0.1:5173/auth/facebook/callback`

The app now defaults OAuth scopes to `public_profile,email` (`VITE_FB_LOGIN_SCOPES`) to avoid invalid/restricted scope errors for normal users.

### 4. Installation
Install dependencies utilizing the strict legacy tree resolver due to specialized nested React 19 abstractions:

```bash
npm install --legacy-peer-deps
```

### 5. Running the Developer Server
The application runs both the Vite Client and the Node Proxy Server concurrently. 

```bash
npm run dev
```

*The App is now accessible at `http://localhost:5173/`. All API requests pointing to `/api/*` are safely proxied to port `3000` via Vite.*

For production (Vercel/Railway), set `VITE_API_BASE_URL` to your backend API domain (for example `https://your-backend.railway.app/api`) if frontend and backend are deployed as separate services, so auth POST requests are not sent to the static frontend host (which can return `405 Method Not Allowed`).

If you deploy this repo as a single Railway service, use:
- Build command: `npm run build`
- Start command: `npm start`
- Set Railway env `DATABASE_URL` to your MongoDB URI
- Set Railway env `REQUIRE_EMAIL_VERIFICATION=false` if you want signup to go directly to dashboard

The Express server now serves both:
- API routes under `/api/*`
- the React app from `dist` for all non-API routes

### 6. Production Builds
To build the static application payload:

```bash
npm run build
```
The output will securely drop into the `/dist` directory. Please note that deploying this application to a live server requires exposing the Express routing file through a runtime orchestrator (like PM2 or Heroku) and hosting the Vite static bundle either alongside it or via a CDN (like Vercel).
