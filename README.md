# Redemption Muay Thai - React.js CMS Application

A high-performance, athletic React.js web application built for **Redemption Muay Thai** on the Sunshine Coast, featuring an in-context visual CMS, multi-page routing, responsive timetables, and Netlify + Supabase integration.

## 🚀 Features

- **React.js & Tailwind CSS**: Modular components (`<Hero />`, `<WelcomeBento />`, `<ClassesGrid />`, `<CoachSpotlight />`, `<Footer />`).
- **Dedicated Multi-Page Router**:
  - `/` (Home)
  - `/coaches` (Meet the Coaches)
  - `/classes` (All Training Programs)
  - `/timetable` (Weekly Timetable - Mon to Sun)
  - `/contact` (Contact & Enquiry Form)
- **Visual CMS Admin Panel**: Access `/admin` to edit copy, upload images, add/edit/delete coaches, classes, timetable slots, and bento cards inline.
- **Zero-Scroll Mobile Card Timetable**: Schedule cards designed for 100% mobile viewport compatibility.
- **Netlify & Supabase SSG Integration**: Pre-rendered static pages with automated Netlify build triggers (Option B).

## 📁 Repository Structure

```
├── src/
│   ├── components/       # React site components (Navbar, Hero, Bento, Classes, Spotlight, Footer)
│   ├── pages/            # Page views (HomePage, CoachesPage, ClassesPage, TimetablePage, ContactPage)
│   └── lib/              # Supabase & Netlify helpers (supabaseClient.js)
├── public/               # Static assets & uploads
├── content.json          # Site copy & structured JSON schema
├── netlify.toml          # Netlify build configuration & SPA redirects
├── supabase_schema.sql   # Supabase SQL database & storage setup script
└── vite.config.js        # Vite React build configuration
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local React dev server
npm run dev

# Build production distribution
npm run build
```

## 🌐 Live Deployment (Netlify + Supabase)

1. Run `supabase_schema.sql` in your Supabase SQL Editor.
2. Connect this GitHub repository to **Netlify.com**.
3. Set environment variables in Netlify (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_NETLIFY_BUILD_HOOK_URL`).
