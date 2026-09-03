// Supabase Client & Netlify Integration Helper
import defaultContent from '../../content.json';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const NETLIFY_BUILD_HOOK_URL = import.meta.env.VITE_NETLIFY_BUILD_HOOK_URL || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http'));
};

// Pure SSG Mode: Content is pre-baked into defaultContent at build time by scripts/fetch-content.js
// Executes 0 runtime API calls to Supabase for public visitors!
export const getSiteContent = async () => {
  return defaultContent;
};

// Save site content to Supabase & trigger Netlify Build Hook (Option B Pure SSG)
export const saveSiteContent = async (contentData) => {
  let savedLocally = false;
  let savedToSupabase = false;

  // 1. Try local Express API if running node server.js locally
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    });
    if (res.ok) {
      const result = await res.json();
      if (result.success) savedLocally = true;
    }
  } catch (err) {
    // Local API not present on Netlify
  }

  // 2. Save / Upsert to Supabase Database
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({
          id: 'main_content',
          data: contentData,
          updated_at: new Date().toISOString()
        })
      });
      if (res.ok) {
        savedToSupabase = true;
        console.log('✅ Successfully saved row to Supabase site_content table!');
      } else {
        const errText = await res.text();
        console.error('Supabase save error status:', res.status, errText);
      }
    } catch (err) {
      console.error('Failed to save to Supabase', err);
    }
  }

  // 3. Trigger Netlify Build Webhook to rebuild static site with new content
  if (NETLIFY_BUILD_HOOK_URL) {
    try {
      await fetch(NETLIFY_BUILD_HOOK_URL, { method: 'POST' });
      console.log('🎉 Netlify build webhook triggered successfully!');
    } catch (err) {
      console.warn('Failed to trigger Netlify build hook', err);
    }
  }

  return { success: true, savedLocally, savedToSupabase };
};

// Upload image (to Supabase Storage if configured, or local upload endpoint)
export const uploadImageFile = async (file) => {
  if (isSupabaseConfigured()) {
    try {
      const filename = `img_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const uploadRes = await fetch(`${SUPABASE_URL}/storage/v1/object/uploads/${filename}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': file.type
        },
        body: file
      });
      if (uploadRes.ok) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/${filename}`;
        return { success: true, url: publicUrl };
      }
    } catch (err) {
      console.warn('Supabase storage upload failed', err);
    }
  }

  // Fallback to local multer upload
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/api/upload', { method: 'POST', body: formData });
  return await res.json();
};
