# Sri Sri Wellbeing Chennai Frontend

Next.js frontend for the public website and the `/admin` content workspace.

## Run

```bash
npm install
npm run dev
```

The frontend now proxies API requests through Next.js at `/api/backend/...` by default.

Optional environment variables:

```env
BACKEND_API_URL=https://srisriwellbeingchennai-backend.onrender.com
NEXT_PUBLIC_API_BASE_URL=/api/backend
```

- Use `BACKEND_API_URL` to tell the Next.js proxy which backend to call.
- Leave `NEXT_PUBLIC_API_BASE_URL` unset unless you explicitly want to override the proxy behavior.
- The admin bookings screen supports `Approve & Mail` plus manual client emails when backend SMTP is configured.

## Structure

```text
app/
  (main)/                  Public site routes
  admin/                   Admin routes
components/
  admin/                   Admin config, state helpers, and UI building blocks
  layouts/                 Shared site layout components
  Main/                    Homepage sections
  NadiPariksha/            Nadi Pariksha content
  NetraTejas/              Netra Tejas content
  Panchakarma/             Panchakarma content
  Relax/                   Relaxation therapy content
lib/
  api.js                   Frontend API client
  site-content.js          Shared content helpers
public/
  images/, fonts/          Static assets
```

## Admin Notes

- `/admin` shows the dashboard
- `/admin/[section]` shows routed editors for each collection
- Admin UI state is split across:
  - `admin-config.js`
  - `admin-form-defaults.js`
  - `admin-data.js`
  - `admin-ui.jsx`
